import { Navigate } from 'react-router-dom';

export const AdminAuth = ({ children }) => {
  const user = localStorage.getItem('user');

  if (user) {
    console.log("1st Breach")
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.data && parsedUser.data.admin === true) {
        return children;
      }
      console.log("2nd Breach")
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
    }
  }
  return <Navigate to="/" />;
};

export default AdminAuth;
