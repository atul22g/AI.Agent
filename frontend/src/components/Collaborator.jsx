import axios from '../config/axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'


const Collaborator = () => {
    const location = useLocation()
    const [project, setProject] = useState([])


    // You can use URLSearchParams to get query params
    const queryParams = new URLSearchParams(location.search);

    // Example: Getting a query param named 'id'
    const projectID = queryParams.get('id');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/projects/get-project/${projectID}`);
                setProject(res.data.project);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [projectID]);

    return (
        <>
            {
                project?.users?.map(user => {
                    return (
                        <div key={user._id} className='p-2 cursor-pointer flex items-center justify-start h-fit hover:bg-[color:var(--hover-text-color)]'>
                            <span className=' bg-[color:var(--primary-color)]  relative rounded-full w-fit h-fit flex items-center justify-center p-4'>
                                <i className="fa-solid fa-user fa-sm text-white absolute"></i>
                            </span>
                            <div className='flex flex-col items-start justify-start p-2 text-white'>
                                <h4 className='text-xs font-medium'>{user.username}</h4>
                                <p className='text-xs '>{user.email}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Collaborator