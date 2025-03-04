import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/user.context'
import { useSelector } from 'react-redux';

const UserAuth = ({ children }) => {
    const user = useSelector(state => state.user.userData);
    // const { user } = useContext(UserContext)
    const [ loading, setLoading ] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()


console.log('user', user);


    useEffect(() => {
        // if (user) {
        //     setLoading(false)
        // }

        if (!token) {
            navigate('/login')
        }

        // if (!user) {
        //     navigate('/login')
        // }

    }, [navigate, token, user])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}

export default UserAuth