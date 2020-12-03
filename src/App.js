import React, { useEffect, useContext } from 'react';
import { Router, navigate } from '@reach/router';

import './components/PageLayout';
import Login from './pages/Login';
import Customer from './pages/Customer';
import { CustomerContextProvider } from './context/CustomerContext';
import { AuthContext } from './context/AuthContext';
import AddCustomer from './components/AddCustomer';

function App() {
  const { toggleIsLoggedIn, setToken, setExpirationDate } = useContext(AuthContext);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.token && new Date(userData.expiresIn) > new Date()){
      toggleIsLoggedIn();
      setToken(userData.token);
      setExpirationDate(userData.expiresIn);
      navigate('/customer');
    } else {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <CustomerContextProvider>
        <Router>
          <Login path="/" />
            <Customer path="/customer" />
          <AddCustomer path='/customer/add' />
        </Router>
      </CustomerContextProvider>
  );
}

export default App;
