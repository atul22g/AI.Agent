import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateFileTree } from '../redux/slices/projectSlice';


const KeyPressListener = ({ setSaveOption }) => {
    const dispatch = useDispatch()

    const fT = JSON.parse(localStorage.getItem('ft'));

    // You can use URLSearchParams to get query params
    const queryParams = new URLSearchParams(location.search);

    // Example: Getting a query param named 'id'
    const projectID = queryParams.get('id');

    const [keyPress, setKeyPress] = useState()
    const [keysPressed, setKeysPressed] = useState({
        Alt: false,
        s: false,
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeyPress(event.keyCode)
            if (event.key === 'Alt' || event.key === 's') {
                setKeysPressed((prevState) => ({
                    ...prevState,
                    [event.key]: true,
                }));
            }
        };

        const handleKeyUp = (event) => {
            setKeyPress(event.keyCode)
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
        if (keysPressed.Alt && keysPressed.s) {
            dispatch(updateFileTree({ projectID, fileTree: fT }));
            setSaveOption ? setSaveOption(true) : ''
        } else if ((!keysPressed.Alt && !keysPressed.s)) {
            if (
                (keyPress >= 48 && keyPress <= 57) ||  // Numbers 0-9
                (keyPress >= 65 && keyPress <= 90) ||  // Uppercase A-Z
                (keyPress >= 97 && keyPress <= 122) || // Lowercase a-z
                (keyPress >= 33 && keyPress <= 47) ||  // Special characters ! to /
                (keyPress >= 58 && keyPress <= 64) ||  // Special characters : to @
                (keyPress >= 92 && keyPress <= 96) ||  // Special characters [ to `
                (keyPress >= 123 && keyPress <= 126) ||  // Special characters { to ~
                keyPress == 8 || keyPress == 13     // Backslash and enter 
            ) {
                // if (keyPress != 18 && (keyPress <! 37 && keyPress >! 40)) { // ignore alt and arrow keys
                if (keyPress != 18 && keyPress != 37 && keyPress != 38 && keyPress != 39 && keyPress != 40) { // ignore alt and arrow keys
                    setSaveOption ? setSaveOption(false) : ''
                }
            }
        }
    }, [keysPressed, keyPress]);
};

export default KeyPressListener;
