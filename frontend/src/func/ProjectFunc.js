import { useEffect, useRef } from 'react'


// SyntaxHighlightedCode is a component that uses the highlight.js library to syntax highlight code blocks.
export const SyntaxHighlightedCode = (props) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [props.className, props.children])

    // return <code {...props} ref={ref} />
}

// Removed appendIncomingMessage and appendOutgoingMessage functions

// function scrollToBottom() {
//     messageBox.current.scrollTop = messageBox.current.scrollHeight
// }