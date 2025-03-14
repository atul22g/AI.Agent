import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BasicCommand, WebContainerCommand } from "../helpers/cmdHander"; // Importing command handlers
import { getWebContainer } from '../config/webContainer'

export default function TerminalInput() {
    // State for storing user input and executed commands
    const [input, setInput] = useState("");
    // const [output, setOutput] = useState('');
    const [commands, setCommands] = useState([]);
    const [webContainer, setWebContainer] = useState(null);

    // Redux state to check if the terminal is open
    const TerminalOpen = useSelector(state => state.setting.Terminal);

    // 
    const ft = JSON.parse(localStorage.getItem("ft"));
    // References for terminal container and input field
    const terminalRef = useRef(null);
    const inputRef = useRef(null);

    // Effect to handle auto-scrolling and input focus when terminal opens
    useEffect(() => {
        if (TerminalOpen) inputRef.current?.focus(); // Auto-focus input
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight); // Scroll to latest command

        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container)
                // console.log("container Start: ", container);
            })
        }
        webContainer?.mount(ft)


    }, [commands, TerminalOpen, ft]);

    // Function to handle command execution
    const handleCommand = (cmd) => {
        if (cmd === "cls") return setCommands([]); // Special case for clearing terminal
        let isCmdProcess;

        const webContainerCmdFunc = async () => {
            let command = WebContainerCommand[cmd]();

            const cmdProcess = await webContainer?.spawn(command[0], command.slice(1));

            if (cmdProcess?.output) {
                let outputText = ""; // Accumulate output

                await cmdProcess.output.pipeTo(new WritableStream({
                    write(chunk) {
                        outputText += chunk; // Strip ANSI codes
                        setCommands(prev => [...prev.slice(0, -1), { cmd, output: outputText }]); // Update last command output
                    }
                }));
            }
        };


        // Execute command if found, otherwise return a Redirect to the webContainerCmdFunc
        let output;
        try {
            if (BasicCommand[cmd]) {
                output = BasicCommand[cmd]()
                isCmdProcess = false
            } else {
                output = WebContainerCommand[cmd]()
                isCmdProcess = true
            }

        } catch {
            setCommands(prev => [...prev, { cmd, output: `Command not found ${cmd}` }]);
            return []
        }

        // Add the executed command and its output to the history
        if (!isCmdProcess) {
            setCommands(prev => [...prev, { cmd, output }]);
        } else (
            webContainerCmdFunc()
        )
    };

    // Handle keypress events, especially the "Enter" key to execute commands
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim()) {
            handleCommand(input.trim()); // Process the entered command
            setInput(""); // Clear input field after execution
        }
    };

    return (
        <div
            ref={terminalRef}
            className={`absolute bottom-0 w-full bg-[color:var(--code-bg)] border-t-2 border-[color:var(--tertiary-color-hover)]
                transition-all duration-300 code-editor-area overflow-y-scroll ${TerminalOpen ? "h-80" : "h-0"}`}
        >
            {/* Render command history */}
            {commands.map(({ cmd, output }, index) => (
                output && (
                    <div key={index} className="mx-2 my-1">
                    {console.log(commands)
                    }
                        <span className="text-white">Terminal &gt; </span>
                        <span className="text-yellow-300">{cmd}</span>
                        <div dangerouslySetInnerHTML={{ __html: output.replace('[',<br/>) }} className="text-emerald-400"></div>
                    </div>
                )
            ))}

            {/* Input field for user to type commands */}
            <div className="flex items-center gap-1 mx-2 my-1">
                <span className="text-white">Terminal &gt;</span>
                <input
                    ref={inputRef}
                    className="text-yellow-300 bg-transparent border-none outline-none w-10/12"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
        </div>
    );
}
