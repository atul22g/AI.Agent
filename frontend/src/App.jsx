
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'
import { Provider } from 'react-redux';
import store from './redux/index'

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <AppRoutes />
        <ToastContainer />
      </UserProvider>
    </Provider>
  )
}

export default App