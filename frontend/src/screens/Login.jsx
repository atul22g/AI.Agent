import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { toast } from 'react-toastify'
import { toastify } from '../config/toastify'
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function submitHandler(e) {

        e.preventDefault()

        axios.post('/users/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            localStorage.removeItem("token");
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
                <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input

                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Don&apos;t have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login