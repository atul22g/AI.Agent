import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'
import { CodeEditor } from '../screens/CodeEditor'
import { AddCollaboratorModal } from '../components/Modals'
import { useSelector } from 'react-redux'

const AppRoutes = () => {
    const addCollaboratorModal = useSelector(state => state.setting.AddCollaboratorModal)

    return (
        <BrowserRouter>
            {
                addCollaboratorModal == 'open' ? <AddCollaboratorModal /> : null
            }
            <Routes>
                <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
                <Route path="/codeEditor" element={<UserAuth><CodeEditor /></UserAuth>} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes