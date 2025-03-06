import { useDispatch } from 'react-redux';
import { ExplorerClosed } from '../redux/slices/settingSlice';

const Collaborator = () => {
        const dispatch = useDispatch();
    
        const closeExplorer = () => {
            dispatch(ExplorerClosed())
        }

    return (
        <>
            {/* title */}
            <div className="flex items-center justify-between px-4 text-[color:var(--text-color)]">
                <h5 className="text-xs py-2">COLLABORATOR</h5>
                <i onClick={() => closeExplorer()} className="cursor-pointer fa-solid fa-xmark-large fa-2xs"></i>
            </div>
        </>
    )
}

export default Collaborator