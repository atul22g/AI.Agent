import { useState } from 'react'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState(null)

    const navigate = useNavigate()
    const project = useSelector(state => state.projects.projects)

    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <main className='p-4 bg-[color:var(--primary-color)] min-h-screen'>
            <div className="projects flex flex-wrap gap-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 text-white bg-[color:var(--tertiary-color)] rounded-md block hover:bg-[color:var(--hover-box-color)]">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

                <div className='w-screen flex gap-2 flex-wrap'>
                    {
                        project?.map((project) => (
                            <div key={project._id}
                                onClick={() => {
                                    navigate(`/project`, {
                                        state: { project }
                                    })
                                }}
                                className="project max-w-4 flex flex-col gap-2 cursor-pointer bg-[color:var(--tertiary-color)] p-4 rounded-md min-w-52 hover:bg-[color:var(--hover-box-color)]">
                                <h2
                                    className='font-semibold text-white'
                                >{project.name}</h2>

                                <div className="flex gap-2 text-[color:var(--text-color)]">
                                    <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                    {project.users.length}
                                </div>

                            </div>
                        ))
                    }
                </div>


            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
    )
}

export default Home