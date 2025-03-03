
import { ToastContainer} from 'react-toastify';
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
      <ToastContainer />
    </UserProvider>
  )
}

export default App