import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from '../config/axios'
import PropTypes from 'prop-types';
import { addUser } from '../redux/slices/userSlice';
import { addProjects } from '../redux/slices/projectSlice';


const UserAuth = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()



    useEffect(() => {
        setTimeout(() => {
            // get user Data
            axios.get('/users/profile').then((res) => {
                dispatch(addUser(res.data.user))
                setLoading(false)
            }).catch(() => {
                setLoading(false)
                navigate('/login')
            })

            // get projects data
            axios.get('/projects/all').then((res) => {
                dispatch(addProjects(res.data.projects))
            }).catch(() => {
                console.log("You Have No Projects")
            })
        }, 5000);
    }, [dispatch, navigate])


    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        if (user == null && !loading) {
            navigate('/login')
        }
    }, [user, loading, navigate, token])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}
UserAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserAuth