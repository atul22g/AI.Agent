import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import hljs from "highlight.js";
import KeyPressListener from "../helpers/KeyPressListener";

const CodeView = () => {
    const [ft, setFt] = useState('');
    const [code, setCode] = useState('');
    const { currentFile } = useSelector(state => state?.CodeEditor);
    const { projects } = useSelector(state => state?.projects);

    const getFt = JSON.parse(localStorage.getItem('ft'));
    // const geFileContent = JSON.parse(localStorage.getItem('fileContent'));

    const fileTree = projects != null ? projects[0]?.fileTree : '';
    const fileContent = fileTree[currentFile]?.file?.contents || '';

    useEffect(() => {
        const updateFileTree = JSON.parse(localStorage.getItem('ft'));
        
        const updateFileContent = updateFileTree ? updateFileTree[currentFile]?.file?.contents || '' : '';
        setCode(updateFileContent);
        setFt(getFt);
        localStorage.setItem('fileContent', JSON.stringify(fileContent));
    }, [currentFile])


    useEffect(() => {
        localStorage.setItem('fileContent', JSON.stringify(fileContent));
    }, [fileContent])

    useEffect(() => {
        localStorage.setItem('ft', JSON.stringify(fileTree));
    }, [fileTree])


    const handleKeyUp = (e) => {
        const updatedContent = e.target.innerText;

        // Update ft directly
        const updatedFileTree = {
            ...ft,
            [currentFile]: {
                file: { contents: updatedContent }
            }
        };

        // Update localStorage after updating the state
        localStorage.setItem('ft', JSON.stringify(updatedFileTree));
        localStorage.setItem('fileContent', JSON.stringify(updatedContent));
    };

    return (
        <>
            <KeyPressListener />
            {ft && ft[currentFile] && (
                <div className="code-editor-area h-full w-full overflow-hidden flex-grow bg-slate-50 absolute">
                    <pre className="hljs h-full">
                        <code
                            className="hljs h-full outline-none"
                            contentEditable
                            suppressContentEditableWarning
                            onKeyUp={handleKeyUp}
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
