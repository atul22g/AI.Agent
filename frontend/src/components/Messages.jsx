import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket.js'
import { getWebContainer } from '../config/webContainer.js'
import Markdown from "markdown-to-jsx"
import { SyntaxHighlightedCode } from '../func/ProjectFunc.jsx'

const Messages = () => {
    // state
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [webContainer, setWebContainer] = useState(null)
    // 
    const user = useSelector(state => state.user.userData)

    // You can use URLSearchParams to get query params
    const queryParams = new URLSearchParams(location.search);

    // Example: Getting a query param named 'id'
    const projectID = queryParams.get('id');

    // Function to send message
    const send = () => {
        sendMessage('project-message', {
            message,
            sender: user
        })
        setMessages(prevMessages => [...prevMessages, { sender: user, message }])
        
        setMessage("")
    }
    console.log(messages)


    function WriteAiMessage(message) {
        const messageObject = JSON.parse(message)
        return (
            <div
                className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
            >
                {/* {console.log("working ", messageObject) } */}
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>)
    }

    useEffect(() => {
        // Initialize socket connection
        initializeSocket(projectID)
        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container)
            })
        }

        // Receive messages
        receiveMessage('project-message', data => {
            if (data.sender._id == 'ai') {
                const message = JSON.parse(data.message)
                webContainer?.mount(message.fileTree)
                // if (message.fileTree) {
                //     setFileTree(message.fileTree || {})
                // }
                setMessages(prevMessages => [...prevMessages, data]) // Update messages state
            } else {
                setMessages(prevMessages => [...prevMessages, data]) // Update messages state
            }
        })
    })


    return (
        <>
            <div className='messages-box p-2 flex flex-col gap-2 overflow-auto'>
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                        <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                        <div className='text-sm'>
                            {msg.sender._id === 'ai' ?
                            WriteAiMessage(msg.message)
                            : <p>{msg.message}</p>}
                            {/* <p>{msg.message}</p> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full h-10 absolute bottom-0'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full h-full rounded-sm bg-[color:var(--text-color)] outline-none border-none p-2'
                    type="text" name="input"
                    placeholder="@ai for chat ai" />
                <span onClick={send} className='absolute right-2 top-2 text-[color:var(--primary-color)]'><i className="fa-solid fa-paper-plane-top fa-lg"></i></span>
            </div>
        </>
    )
}

export default Messages