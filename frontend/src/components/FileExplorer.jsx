import { useSelector, useDispatch } from 'react-redux'
import { currentFileOpen, filesOpens } from '../redux/slices/codeEditorSlice'

const FileExplorer = () => {
    const dispatch = useDispatch()
    const project = useSelector(state => state?.projects?.projects)
    const fileTree = project != null ? project[0].fileTree : null

    const changeFile = (file) => {
        dispatch(filesOpens({ currentFile: file }))
        dispatch(currentFileOpen({ file }))
    }

    // useEffect(() => {
    //     dispatch(filesOpens({ currentFile }))
    // }, [currentFile])

    return (
        <>
            {
                fileTree != null ? Object.keys(fileTree).map((file, index) => (
                    <span key={index}
                        onClick={() => changeFile(file)}
                        className="cursor-pointer  hover:bg-[color:var(--hover-text-color)] px-4 text-[color:var(--text-color)] flex items-center gap-2">
                        <i className="fa-solid fa-files text-white"></i>
                        <span className="pb-1">{file}</span>
                    </span>
                )) : null
            }
            {/* Server  */}
            <span onClick={() => changeFile('server')}
                className="cursor-pointer  hover:bg-[color:var(--hover-text-color)] px-4 text-[color:var(--text-color)] flex items-center gap-2">
                <i className="fa-solid fa-server text-white"></i>
                <span className="pb-1">Server</span>
            </span>
        </>
    )
}

export default FileExplorer