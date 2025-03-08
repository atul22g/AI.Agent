import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import hljs from "highlight.js";
import KeyPressListener from "./KeyPressListener";

const CodeView = () => {
    // state
    const [fileTreeS, setFileTreeS] = useState('');
    const [code, setCode] = useState('');

    const { currentFile } = useSelector(state => state?.CodeEditor)
    const { projects } = useSelector(state => state?.projects)
    const fileTreeVal = projects != null ? projects[0]?.fileTree : '';
    const fileContent = fileTreeVal[currentFile]?.file?.contents || '';

    useEffect(() => {
        setFileTreeS(fileTreeVal)
        setCode(fileContent)
    }, [fileTreeVal, fileTreeS, fileContent, currentFile]);

    return (
        <>
            <KeyPressListener fileTree={fileTreeS} />
            {fileTreeS[currentFile] && (
                <div className="code-editor-area h-full w-full overflow-hidden flex-grow bg-slate-50 absolute">
                    <pre className="hljs h-full">
                        <code
                            className="hljs h-full outline-none"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                                const updatedContent = e.target.innerText;
                                const updatedFileTree = {
                                    ...fileTreeS,
                                    [currentFile]: {
                                        file: { contents: updatedContent }
                                    }
                                };

                                setCode(updatedContent)
                                setFileTreeS(updatedFileTree);
                            }}
                            style={{
                                whiteSpace: 'pre-wrap',
                                paddingBottom: '25rem',
                                counterSet: 'line-numbering',
                            }}
                            dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', code).value }}
                        />
                    </pre>
                </div>
            )}
        </>
    );
};

export default CodeView;
