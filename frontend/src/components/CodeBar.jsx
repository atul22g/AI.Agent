import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CodeView from './CodeView'
import { filesOpens } from '../redux/slices/codeEditorSlice'

const CodeBar = () => {
    const dispatch = useDispatch()
    const { currentFile, ifcurrentFileOpen } = useSelector(state => state.CodeEditor)
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
        <div className="w-full relative">
            {/* Open Files */}
            <div className="w-full h-9 bg-[color:var(--secondary-color)] flex">
                {openFiles.map((file, index) => (
                    <span key={index}
                        onClick={() => changeFile(file)}
                        className={`bg-slate-600 text-[color:var(--text-color)] border-b-2 cursor-pointer h-9 w-40 flex justify-evenly items-center group ${currentFileState == file ? 'border-white' : 'border-transparent'}`}>
                        <i className="fa-solid fa-files"></i>
                        <span className="font-medium">{file}</span>
                        <i onClick={(e) => removecurrentFile(e, file)} className={`fa-light fa-xmark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-400 duration-200 rounded-md p-1 ${currentFileState == file ? 'opacity-100 ' : ''}`}></i>
                    </span>
                ))}
            </div>
            {/* Code View */}
            <CodeView />
        </div>
    )
}

export default CodeBar