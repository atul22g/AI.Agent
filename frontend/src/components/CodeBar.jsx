import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CodeView from './CodeView'
import { currentFileOpen, filesOpens } from '../redux/slices/codeEditorSlice'
import KeyPressListener from '../helpers/KeyPressListener'
import { getWebContainer } from '../config/webContainer'
import { AddServerUrl } from '../redux/slices/settingSlice'
// import Terminal from './Terminal'

const CodeBar = () => {
    const dispatch = useDispatch()
    const { currentFile, ifcurrentFileOpen } = useSelector(state => state.CodeEditor)


    const [saveOption, setSaveOption] = useState([])
    // const [runProcess, setRunProcess] = useState(null)
    const [codeRunnerIcon, setCodeRunnerIcon] = useState(`fa-play`)
    const [currentFileState, setCurrentFileState] = useState(null)
    const [ifCurrentFile, setIfCurrentFile] = useState(false)
    const [openFiles, setOpenFiles] = useState([])
    const [webContainer, setWebContainer] = useState(null)


    const fileTree = JSON.parse(localStorage.getItem('ft'));

    const removecurrentFile = (e, file) => {
        e.stopPropagation();
        if (currentFileState != file && openFiles.length >= 1) {
            setIfCurrentFile(true)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
        } else if (openFiles.includes(file) && openFiles.length < 1) {
            setIfCurrentFile(false)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
        } else if (currentFileState == file) {
            setIfCurrentFile(true)
            let newOpenFiles = openFiles.filter(item => item !== file)
            setOpenFiles([...newOpenFiles])
            dispatch(filesOpens({ currentFile: '' }))
        }
    }

    const changeFile = (file) => {
        setCurrentFileState(file)
        dispatch(filesOpens({ currentFile: file }))
        dispatch(currentFileOpen({ file }))
    }

    async function installDependencies() {
        // Install dependencies
        const installProcess = await webContainer.spawn('npm', ['install']);
        // Wait for install command to exit
        // console.log("Installing dependencies...");
        
        return installProcess.exit;
    }

    async function startDevServer() {
        // Run `npm run start` to start the Express app
        await webContainer.spawn('npm', ['run', 'start']);
        // console.log("Project Start.");

        // Wait for `server-ready` event
        webContainer.on('server-ready', (port, url) => {
            dispatch(AddServerUrl(url));
            // console.log(`Server is running`);
            // Open the browser with the URL
            // window.open(url);
        });
    }

    const codeRunner = async () => {
        if (codeRunnerIcon == 'fa-play') {
            setCodeRunnerIcon('fa-pause');
        } else {
            setCodeRunnerIcon('fa-play');
        }

        // Mount the File
        await webContainer.mount(fileTree)


        installDependencies().then(() => {
            // Run the Project
            startDevServer()
        });
    }


    useEffect(() => {
        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container)
            })
        }

        if (currentFile != currentFileState) {
            setCurrentFileState(currentFile)
        }
        if (!openFiles.includes(currentFile) && currentFile != null && !ifCurrentFile) {
            setCurrentFileState(currentFile)
            setOpenFiles([...openFiles, currentFile])
        }
        // update the state only
        if (ifCurrentFile) {
            setIfCurrentFile(false)
        }
    }, [currentFile, openFiles, ifcurrentFileOpen, getWebContainer])

    return (
        <>
            <KeyPressListener setSaveOption={setSaveOption} saveOption={saveOption} currentFile={currentFile} />
            <div className="w-full relative">
                {/* Open Files */}
                <div className="relative w-full h-9 bg-[color:var(--secondary-color)] flex overflow-scroll message-box">
                    {openFiles.map((file, index) => (
                        <span key={index}
                            onClick={() => changeFile(file)}
                            className={`bg-[color:var(--code-bg)] text-[color:var(--text-color)] border-b-2 cursor-pointer h-9 w-40 flex justify-evenly items-center group ${currentFileState == file ? 'border-white' : 'border-transparent'}`}>
                            {file != 'server' ?
                                <i className="fa-solid fa-files"></i> : <i className="fa-solid fa-server"></i>
                            }
                            <span className="font-medium">{file}</span>
                            {
                                currentFileState === file ? (
                                    saveOption.some(fileItem => fileItem.fileName === file) ? (
                                        saveOption.map((fileItem, key) => {
                                            if (fileItem.fileName === file) {
                                                if (fileItem.status === "typing") {
                                                    return <span key={key} className='bg-white p-1 mx-[5px] rounded-full'></span>;
                                                } else if (fileItem.status === "saving") {
                                                    return (
                                                        <i
                                                            key={key}
                                                            onClick={(e) => removecurrentFile(e, file)}
                                                            className={`fa-light fa-xmark opacity-0 group-hover:opacity-100 transition-opacity 
                                hover:bg-slate-400 duration-200 rounded-md p-1 ${currentFileState === file ? 'opacity-100 ' : ''}`}
                                                        ></i>
                                                    );
                                                }
                                            }
                                            return null; // Ensures the function always returns a value
                                        })
                                    ) : (
                                        <i
                                            onClick={(e) => removecurrentFile(e, file)}
                                            className={`fa-light fa-xmark opacity-0 group-hover:opacity-100 transition-opacity 
            hover:bg-slate-400 duration-200 rounded-md p-1 ${currentFileState === file ? 'opacity-100 ' : ''}`}
                                        ></i>
                                    )
                                ) : (
                                    <span className='bg-[color:var(--code-bg)] mx-[5px] p-1 rounded-full'></span> // Default when file state doesn't match
                                )
                            }
                        </span>
                    ))}
                    {/* Server Run Button  */}
                    <span className='absolute right-5 top-[0.3rem] text-white cursor-pointer'>
                        <i onClick={codeRunner} className={`fa-solid ${codeRunnerIcon}`}></i>
                    </span>
                </div>
                {/* Code View */}
                <CodeView />
                {/* Terminal */}
                {/* <Terminal /> */}
            </div >
        </>
    )
}

export default CodeBar