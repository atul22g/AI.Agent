import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CodeView from './CodeView'
import { currentFileOpen, filesOpens } from '../redux/slices/codeEditorSlice'
import KeyPressListener from '../helpers/KeyPressListener'
import Terminal from './Terminal'

const CodeBar = () => {
    const dispatch = useDispatch()
    const { currentFile, ifcurrentFileOpen } = useSelector(state => state.CodeEditor)


    const [saveOption, setSaveOption] = useState([])
    const [currentFileState, setCurrentFileState] = useState(null)
    const [ifCurrentFile, setIfCurrentFile] = useState(false)
    const [openFiles, setOpenFiles] = useState([])

    const removecurrentFile = (e, file) => {
        e.stopPropagation();
        if (currentFileState != file && openFiles.length >= 1) {
            setIfCurrentFile(true)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
        } else if (openFiles.includes(file) && openFiles.length < 1) {
            setIfCurrentFile(false)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
        } else if (currentFileState == file) {
            setIfCurrentFile(true)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
            dispatch(filesOpens({ currentFile: '' }))
        }
    }

    const changeFile = (file) => {
        setCurrentFileState(file)
        dispatch(filesOpens({ currentFile: file }))
        dispatch(currentFileOpen({ file }))
    }

    useEffect(() => {

        if (currentFile != currentFileState) {
            setCurrentFileState(currentFile)
        }
        if (!openFiles.includes(currentFile) && currentFile != null && !ifCurrentFile) {
            setCurrentFileState(currentFile)
            setOpenFiles([...openFiles, currentFile])
        }
        // update the state only
        if (ifCurrentFile) {
            setIfCurrentFile(false)
        }
    }, [currentFile, openFiles, ifcurrentFileOpen])

    return (
        <>
            <KeyPressListener setSaveOption={setSaveOption} saveOption={saveOption} currentFile={currentFile} />
            <div className="w-full relative">
                {/* Open Files */}
                <div className="w-full h-9 bg-[color:var(--secondary-color)] flex overflow-scroll message-box">
                    {openFiles.map((file, index) => (
                        <span key={index}
                            onClick={() => changeFile(file)}
                            className={`bg-[color:var(--code-bg)] text-[color:var(--text-color)] border-b-2 cursor-pointer h-9 w-40 flex justify-evenly items-center group ${currentFileState == file ? 'border-white' : 'border-transparent'}`}>
                            <i className="fa-solid fa-files"></i>
                            <span className="font-medium">{file}</span>
                            {
                                currentFileState === file ? (
                                    saveOption.some(fileItem => fileItem.fileName === file) ? (
                                        saveOption.map((fileItem, key) => {
                                            if (fileItem.fileName === file) {
                                                if (fileItem.status === "typing") {
                                                    return <span key={key} className='bg-white p-1 mx-[5px] rounded-full'></span>;
                                                } else if (fileItem.status === "saving") {
                                                    return (
                                                        <i
                                                            key={key}
                                                            onClick={(e) => removecurrentFile(e, file)}
                                                            className={`fa-light fa-xmark opacity-0 group-hover:opacity-100 transition-opacity 
                                hover:bg-slate-400 duration-200 rounded-md p-1 ${currentFileState === file ? 'opacity-100 ' : ''}`}
                                                        ></i>
                                                    );
                                                }
                                            }
                                            return null; // Ensures the function always returns a value
                                        })
                                    ) : (
                                        <i
                                            onClick={(e) => removecurrentFile(e, file)}
                                            className={`fa-light fa-xmark opacity-0 group-hover:opacity-100 transition-opacity 
            hover:bg-slate-400 duration-200 rounded-md p-1 ${currentFileState === file ? 'opacity-100 ' : ''}`}
                                        ></i>
                                    )
                                ) : (
                                    <span className='bg-[color:var(--code-bg)] mx-[5px] p-1 rounded-full'></span> // Default when file state doesn't match
                                )
                            }

                        </span>
                    ))}
                </div>
                {/* Code View */}
                <CodeView />
                {/* Terminal */}
                <Terminal/>
            </div>
        </>
    )
}

export default CodeBar