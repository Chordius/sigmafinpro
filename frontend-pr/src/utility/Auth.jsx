import { Navigate } from 'react-router-dom';

export const Auth = ({ children }) => {
    
    if (!localStorage.getItem('user')) {
        return <Navigate to='/'/>
    }

  return children
}

export default Auth
