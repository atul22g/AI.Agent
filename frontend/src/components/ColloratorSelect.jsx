import Select from 'react-select';
import { useState } from 'react';
import { colourStyles } from '../ColourSelect';
import axios from '../config/axios';
import PropTypes from 'prop-types'; // Import PropTypes


const ColloratorSelect = ({ selectedUser, setSelectedUser }) => {
    const [collaborator, setCollaborator] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handle selected User
    const handleChange = (selected) => {
        setSelectedUser(selected);
    };
    

    const loadCollaborator = async (inputValue) => {
        if (!inputValue) return []; // If there's no input value, return an empty array
        setIsLoading(true);
        try {
            const Users = await axios.get(`/users/all`);

            const data = Users.data.users.map(user => ({
                value: String(user._id || 'Unknown User'),  // Ensure value is always a string
                label: String(user.username || 'Unknown User'),
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
            value={selectedUser}
            onChange={handleChange}
        />
    );
};

// Add PropTypes validation
ColloratorSelect.propTypes = {
    selectedUser: PropTypes.array, // Expect selectedUser to be an object
    setSelectedUser: PropTypes.func, // Expect setSelectedUser to be a function
};


export default ColloratorSelect;
