import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function TerminalInput() {
    const [input, setInput] = useState("");
    const [commands, setCommands] = useState([]);
    const TerminalOpen = useSelector(state => state.setting.Terminal);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to bottom when new command is added
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }

        // Auto-focus input when terminal opens
        if (TerminalOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [commands, TerminalOpen]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (input.trim()) { // Prevent empty commands
                setCommands([...commands, input]);
                setInput("");
            }
        }
    };

    return (
        <div
            ref={terminalRef}
            className={`absolute code-editor-area bottom-0 w-full bg-[color:var(--code-bg)] border-t-2 border-[color:var(--tertiary-color-hover)]
                transition-all duration-300 overflow-y-scroll ${TerminalOpen ? "h-80" : "h-0"}`}
        >
            {commands.map((cmd, index) => (
                <div key={index} className="flex items-center gap-1 mx-2 my-1">
                    <span className="w-2 h-2 rounded-full border-2 border-slate-400 inline-block"></span>
                    <span className="text-white">Terminal &gt;</span>
                    <span className="text-yellow-300">{cmd}</span>
                </div>
            ))}

            <span className="flex items-center gap-1 mx-2 my-1">
                <span className="w-2 h-2 rounded-full border-2 border-slate-400 inline-block"></span>
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
            </span>
        </div>
    );
}
