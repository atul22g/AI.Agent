import { useEffect, useState } from "react"
import ActivityBar from "../components/ActivityBar"
import FileExplorer from "../components/FileExplorer"
import { useSelector } from 'react-redux'
import MessgesBar from "../components/MessgesBar"
import Collaborator from "../components/Collaborator"

export const CodeEditor = () => {
    // get data from localstrge 
    const ExplorerVal = localStorage.getItem("Explorer")
    
    // state
    const Explorer = useSelector(state => state.setting.Explorer) 
    const ActivityBarOption = useSelector(state => state.setting.ActivityBarOption) 
    const [explorer, setExplorer] = useState('open')

    useEffect(() => {
        setExplorer(ExplorerVal)
        setExplorer(Explorer)

    }, [ExplorerVal, explorer, Explorer])
    return (
        <section className="min-h-screen bg-slate-600 flex">
            {/* Activity Bar */}
            <ActivityBar />
            {/* Explorer */}
            <div className={`bg-[color:var(--secondary-color)] min-h-screen ${explorer === 'close' ? 'w-0' : 'w-72'} flex flex-col overflow-hidden relative`}>
                {ActivityBarOption === 'files' ? <FileExplorer /> : ''}
                {ActivityBarOption === 'messages' ? <MessgesBar /> : ''}
                {ActivityBarOption === 'collaborator' ? <Collaborator /> : ''}
            </div>
        </section>
    )
}
