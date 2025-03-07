import Select from 'react-select';
import { useState } from 'react';
import { colourStyles } from '../ColourSelect';
import axios from '../config/axios';


const ColloratorSelect = () => {
    const [collaborator, setCollaborator] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCollaborator = async (inputValue) => {
        if (!inputValue) return []; // If there's no input value, return an empty array
        setIsLoading(true);
        try {
            const Users = await axios.get(`/users/all`);

            const data = Users.data.users.map(item => ({
                value: String(item.username || ''),  // Ensure value is always a string
                label: String(item.username || 'Unknown User'),
            }));
            setCollaborator(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Select
            id="select2"
            isMulti
            isLoading={isLoading}
            styles={colourStyles}
            onKeyDown={loadCollaborator} // Trigger AJAX when input changes
            options={collaborator.length >= 1 ? collaborator : []}
            placeholder="Search for items"
            noOptionsMessage={() => 'No items found'}
        />
    );
};

export default ColloratorSelect;
