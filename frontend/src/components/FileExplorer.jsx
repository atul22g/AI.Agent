import { useSelector } from 'react-redux'

const FileExplorer = () => {
    const project = useSelector(state => state?.projects?.projects)
    const fileTree = project != null ? project[0].fileTree : null

    return (
        <>
            {
                fileTree != null ? Object.keys(fileTree).map((file, index) => (
                    <span key={index} className="cursor-pointer  hover:bg-[color:var(--hover-text-color)] px-4 text-[color:var(--text-color)] flex items-center gap-2">
                        <i className="fa-solid fa-files text-white"></i>
                        <span className="pb-1">{file}</span>
                    </span>
                )) : null
            }
        </>
    )
}

export default FileExplorer