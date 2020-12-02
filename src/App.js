import { Router } from '@reach/router';

import './components/PageLayout';
import Login from './pages/Login';
import Customer from './pages/Customer';
import { CustomerContextProvider } from './context/CustomerContext';
import { AuthContextProvider } from './context/AuthContext';
import AddCustomer from './components/AddCustomer';

function App() {
  return (
    <AuthContextProvider>
      <CustomerContextProvider>
        <Router>
          <Login path="/" />
            <Customer path="/customer" />
          <AddCustomer path='/customer/add' />
        </Router>
      </CustomerContextProvider>
    </AuthContextProvider>
  );
}

export default App;
