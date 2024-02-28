import { Outlet  } from 'react-router-dom';
import Nav from './components/nav'
import './index.css'
import AuthProvider from './utils/AuthContext';
function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Outlet />
      </AuthProvider>
      
    </>
  )
}

export default App
