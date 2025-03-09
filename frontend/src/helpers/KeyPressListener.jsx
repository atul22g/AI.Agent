import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateFileTree } from '../redux/slices/projectSlice';


const KeyPressListener = () => {
    const dispatch = useDispatch()

    const fT = JSON.parse(localStorage.getItem('ft'));

    // You can use URLSearchParams to get query params
    const queryParams = new URLSearchParams(location.search);

    // Example: Getting a query param named 'id'
    const projectID = queryParams.get('id');

    const [keysPressed, setKeysPressed] = useState({
        Alt: false,
        s: false,
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Alt' || event.key === 's') {
                setKeysPressed((prevState) => ({
                    ...prevState,
                    [event.key]: true,
                }));
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Alt' || event.key === 's') {
                setKeysPressed((prevState) => ({
                    ...prevState,
                    [event.key]: false,
                }));
            }
        };

        // Add event listeners for keydown and keyup
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        // Check if both 'a' and 'b' are pressed together
        if (keysPressed.Alt && keysPressed.s) {
            console.log(fT);
            dispatch(updateFileTree({ projectID,fileTree: fT}));

        }
    // }, [keysPressed, dispatch, projectID,fT]);
    }, [keysPressed]);
};

export default KeyPressListener;
