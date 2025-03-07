import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// SyntaxHighlightedCode is a component that uses the highlight.js library to syntax highlight code blocks.
export const SyntaxHighlightedCode = (props) => {
    const ref = useRef(null)

    console.log("props ", props);

    useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [props.className, props.children])

    return <code {...props} ref={ref} />
}

// Add PropTypes validation for props
SyntaxHighlightedCode.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
};