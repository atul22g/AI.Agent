import { useDispatch } from 'react-redux';
import { ExplorerClosed } from '../redux/slices/settingSlice';

const FileExplorer = () => {
    const dispatch = useDispatch();

    const closeExplorer = () => {
        dispatch(ExplorerClosed())
    }
    return (
        <>
            {/* title */}
            <div className="flex items-center justify-between px-4 text-[color:var(--text-color)]">
                <h5 className="text-xs py-2">EXPLORER</h5>
                <i onClick={() => closeExplorer()} className="cursor-pointer fa-solid fa-xmark-large fa-2xs"></i>
            </div>
            {/* files */}
            <span className="cursor-pointer  hover:bg-[color:var(--hover-text-color)] px-4 text-[color:var(--text-color)] flex items-center gap-2">
                <i className="fa-brands fa-js text-yellow-300"></i>
                <span className="pb-1">server.js</span>
            </span>
        </>
    )
}

export default FileExplorer