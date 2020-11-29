import { Router } from '@reach/router';

import './components/PageLayout';
import Login from './pages/Login';
import Customer from './pages/Customer';
import { CustomerContextProvider } from './context/CustomerContext';
import AddCustomer from './components/AddCustomer';

function App() {
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
