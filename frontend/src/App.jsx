
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux';
import store from './redux/index'

const App = () => {
  return (
    <Provider store={store}>
        <AppRoutes />
        <ToastContainer />
    </Provider>
  )
}

export default App