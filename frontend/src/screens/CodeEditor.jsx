import { useEffect, useState } from "react"
import ActivityBar from "../components/ActivityBar"
import { useSelector } from 'react-redux'
import ExplorerBar from "../components/ExplorerBar"
import CodeBar from "../components/CodeBar"
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
    return (
        <section className="relative max-h-screen bg-slate-600 flex">
            {/* Activity Bar */}
            <ActivityBar />
            {/* Explorer */}
            <div className={`bg-[color:var(--secondary-color)] min-h-screen ${explorer === 'close' ? 'w-0' : 'w-72'} flex flex-col overflow-hidden relative`}>
                <ExplorerBar />
            </div>
            {/* CodeBar */}
            <CodeBar />
        </section>
    )
}
