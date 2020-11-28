import { Router } from '@reach/router';

import './components/PageLayout';
import Login from './pages/Login';
import Customer from './pages/Customer';
import AddCustomer from './components/AddCustomer';

function App() {
  return (
    <Router>
      <Login path="/" />
      <Customer path="/customer" />
      <AddCustomer path='/customer/add' />
    </Router>
  );
}

export default App;
