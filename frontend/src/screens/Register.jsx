import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { toast } from 'react-toastify';
import { toastify } from '../config/toastify';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const [field, setField] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    // handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setField({
            ...field,
            [name]: value,
        });
    };

    // const { setUser } = useContext(UserContext)

    const navigate = useNavigate()


    function submitHandler(e) {
        e.preventDefault()

        axios.post('/users/register', {
            username: field.username,
            email: field.email,
            password: field.password
        }).then((res) => {
            // console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch(addUser(res.data.user))
            navigate('/')
        }).catch((err) => {
            console.log(err);
            // console.log(err.response.data);
            const errorMessage = typeof err.response.data === 'string' 
                ? err.response.data.split(':')[2].trim() 
                : err.response.data.errors[0].msg;
            toast.error(errorMessage, toastify())
        })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">UserName</label>
                        <input
                            value={field.username}
                            onChange={handleInput}
                            type="text"
                            name="username"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your UserName"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            value={field.email}
                            onChange={handleInput}
                            type="email"
                            name="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            value={field.password}
                            onChange={handleInput}
                            type="password"
                            name="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}
export default Register