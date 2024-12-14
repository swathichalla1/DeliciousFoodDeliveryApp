import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: element, ...rest }) => {
  const token = localStorage.getItem('jwtToken'); 
  
  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/" />}
    />
  );
};


export default ProtectedRoute