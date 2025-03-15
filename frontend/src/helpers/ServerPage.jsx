import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const ServerPage = () => {
    const [serverUrl, setserverUrl] = useState()
    const getServerUrl = useSelector(state => state?.setting.ServerUrl);

    useEffect(() => {
        // console.log(getServerUrl);
        setserverUrl(getServerUrl)
    }, [getServerUrl])

    return (
        <div className="bg-[color:var(--code-bg)] h-[calc(100vh-2.25rem)] w-full p-1">
            <div className="bg-[color:var(--code-bg)]">
                <input type="text"
                    onChange={(e) => setserverUrl(e.target.value)}
                    value={serverUrl} className="w-full p-2 px-4 rounded-lg border-2 border-white text-white bg-[color:var(--code-bg)]" />
            </div>
            {
                serverUrl ? <iframe className="w-full h-full" src={serverUrl} frameBorder="0"></iframe> :
                    <h2 className='text-white'>The Server is Not Running</h2>
            }
        </div>
    )
}

export default ServerPage