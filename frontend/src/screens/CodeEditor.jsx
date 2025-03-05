import { useEffect, useState } from "react"
import ActivityBar from "../components/ActivityBar"
import FileExplorer from "../components/FileExplorer"
import { useSelector } from 'react-redux'

export const CodeEditor = () => {
    // get data from localstrge 
    const ExplorerVal = localStorage.getItem("Explorer")
    
    // state
    const Explorer = useSelector(state => state.setting.Explorer) 
    const [explorer, setExplorer] = useState('open')

    useEffect(() => {
        setExplorer(ExplorerVal)
        setExplorer(Explorer)

    }, [ExplorerVal, explorer, Explorer])

    // console.log(explorer);
    return (
        <section className="min-h-screen bg-slate-600 flex">
            {/* Activity Bar */}
            <ActivityBar />
            {/* Explorer */}
            {/* file Explorer */}
            <div className={`bg-[color:var(--secondary-color)] min-h-screen ${explorer === 'close' ? 'w-0' : 'w-64'} flex flex-col overflow-hidden`}>
                <FileExplorer />
            </div>

        </section>
    )
}
