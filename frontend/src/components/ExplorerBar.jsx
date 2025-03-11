import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { AddCollaboratortoggle } from '../redux/slices/settingSlice';
import FileExplorer from './FileExplorer';
import Messages from './Messages';
import Collaborator from './Collaborator';


const ExplorerBar = () => {
    const dispatch = useDispatch();
    const ActivityBarOption = useSelector(state => state.setting.ActivityBarOption)
    return (
        <>
            {/* title */}
            < div className="flex items-center justify-between px-4 text-[color:var(--text-color)]" >
                <h5 className="text-xs py-2">{ActivityBarOption.toUpperCase()}</h5>
                <span className='flex gap-3'>
                    {
                        ActivityBarOption === 'collaborator' ? <i onClick={() => dispatch(AddCollaboratortoggle('open'))} className="cursor-pointer fa-solid fa-user-plus fa-2xs"></i> : ''
                    }
                </span>
            </div >
            {/* Body */}
            {ActivityBarOption === 'files' ? <FileExplorer /> : ''}
            {ActivityBarOption === 'messages' ? <Messages /> : ''}
            {ActivityBarOption === 'collaborator' ? <Collaborator /> : ''}
        </>
    )
}

export default ExplorerBar