import { useDispatch } from 'react-redux';
import { ExplorerClosed } from '../redux/slices/settingSlice';

const MessgesBar = () => {
    const dispatch = useDispatch();

    const closeExplorer = () => {
        dispatch(ExplorerClosed())
    }
    return (
        <>
            {/* title */}
            <div className="flex items-center justify-between px-4 text-[color:var(--text-color)]">
                <h5 className="text-xs py-2">MESSAGES</h5>
                <i onClick={() => closeExplorer()} className="cursor-pointer fa-solid fa-xmark-large fa-2xs"></i>
            </div>
            {/* Messges */}
            <div className='messages-box p-2 flex flex-col gap-2 overflow-auto'>
                {/* sender */}
                <div className="max-w-52 ml-auto  message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                    <small className='opacity-65 text-xs'>UserName</small>
                    <div className='text-sm'>
                        hi there dovjwrui iubhjiuf ighefui  uihiu uighwiu
                    </div>
                </div>
                {/* reciver */}
                <div className="max-w-52 mr-auto  message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                    <small className='opacity-65 text-xs'>UserName</small>
                    <div className='text-sm'>
                        hi there dovjwrui iubhjiuf ighefui  uihiu uighwiu
                    </div>
                </div>
            </div>
            {/* Messagess input send area */}
            <div className='w-full h-10 absolute bottom-0'>
                <input
                    className='w-full h-full rounded-sm bg-[color:var(--text-color)] outline-none border-none p-2'
                    type="text" name="input"
                    placeholder="@ai for chat ai" />
                <span className='absolute right-2 top-2 text-[color:var(--primary-color)]'><i className="fa-solid fa-paper-plane-top fa-lg"></i></span>
            </div>
        </>
    )
}

export default MessgesBar