const FileExplorer = () => {

    return (
        <>
            <span className="cursor-pointer  hover:bg-[color:var(--hover-text-color)] px-4 text-[color:var(--text-color)] flex items-center gap-2">
                <i className="fa-brands fa-js text-yellow-300"></i>
                <span className="pb-1">server.js</span>
            </span>
        </>
    )
}

export default FileExplorer