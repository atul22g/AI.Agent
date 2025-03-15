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
            {
                
            }
            <iframe className="w-full h-full" src={serverUrl} frameBorder="0"></iframe>
        </div>
    )
}

export default ServerPage