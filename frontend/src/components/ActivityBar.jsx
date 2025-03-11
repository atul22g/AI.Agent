import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ActivityBartoggle } from "../redux/slices/settingSlice";

const ActivityBar = () => {
    const dispatch = useDispatch();
    // state
    const [activityBarOption, setactivityBarOption] = useState('files')
    // selector
    const ActivityBar = useSelector(state => state.setting.ActivityBarOption)


    const ActivityBarFunc = (props) => {
        setactivityBarOption(props)
        dispatch(ActivityBartoggle(props))
    }

    useEffect(() => {
        setactivityBarOption(ActivityBar)
    }, [ActivityBar])
    

    return (
        <div className="bg-[color:var(--primary-color)] min-w-[53px] min-h-screen w-14 flex flex-col">
            {/* files */}
            <span onClick={() => ActivityBarFunc('files')} className={`text-white h-12 w-full cursor-pointer flex items-center justify-center border-l-2 border-transparent  ${activityBarOption === 'files' ? 'border-white' : ''}`}>
                <i className="fa-solid fa-files fa-xl"></i>
            </span>
            {/* Messages */}
            <span onClick={() => ActivityBarFunc('messages')} className={`text-white h-12 w-full cursor-pointer flex items-center justify-center border-l-2 border-transparent   ${activityBarOption === 'messages' ? 'border-white' : ''}`}>
                <i className="fa-solid fa-messages fa-xl"></i>
            </span>
            {/* collaborator */}
            <span onClick={() => ActivityBarFunc('collaborator')} className={`text-white h-12 w-full cursor-pointer flex items-center justify-center border-l-2 border-transparent   ${activityBarOption === 'collaborator' ? 'border-white' : ''}`}>
                <i className="fa-solid fa-people-group fa-xl"></i>
            </span>
        </div>
    )
}

export default ActivityBar