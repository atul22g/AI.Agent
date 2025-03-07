import { useDispatch } from 'react-redux';
import { AddCollaboratortoggle } from "../redux/slices/settingSlice";
import ColloratorSelect from './ColloratorSelect';
import axios from '../config/axios';

export const AddCollaboratorModal = () => {
    const dispatch = useDispatch();

        // You can use URLSearchParams to get query params
        const queryParams = new URLSearchParams(location.search);

        // Example: Getting a query param named 'id'
        const projectID = queryParams.get('id');

    const handleAddCollaborator = () => {
        try {
            axios.put("/projects/add-user", {
                projectId: projectID,
                // users: Array.from(selectedUserId)
            }).then(res => {
                console.log(res.data)
                // setIsModalOpen(false)

            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-[color:var(--primary-color)] p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-xl text-white font-semibold mb-4">Add Collaborator</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium text-[color:var(--text-color)]">Name</label>
                        <ColloratorSelect />
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => dispatch(AddCollaboratortoggle('close'))}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleAddCollaborator()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Collaborator
                    </button>
                </div>
            </div>
        </div>
    )
}