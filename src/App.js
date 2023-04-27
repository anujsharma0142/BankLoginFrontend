import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AddNewComponent from './components/AddNewComponent/AddNewComponent';
import Customer from './components/AdminDashboard/Customer/Customer';
import UpdateBank from './components/UpdateBank/UpdateBank';
import AddNewCustomer from './components/AdminDashboard/Customer/AddNewCustomer';
import UpdateCustomer from './components/AdminDashboard/Customer/UpdateCustomer';
import Accounts from './components/AdminDashboard/Accounts/Accounts';
import AddNewAccount from './components/AdminDashboard/Accounts/AddNewAccount';
import Passbook from './components/UserDashboard/Passbook/Passbook';
import Transaction from './components/UserDashboard/Transaction/Transaction';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/logout' element={<Login />} />
        <Route exact path='/admindashboard/:username/:role/:token' element={<AdminDashboard />} />
        <Route exact path='/userdashboard/:username/:role/:token' element={<UserDashboard />} />
        <Route exact path='/addnew/:username/:role/:token' element={<AddNewComponent />} />
        <Route exact path='/update/:username/:role/:token/:bankId/:name/:abbriviation' element={<UpdateBank />} />
        <Route exact path='/customer/:username/:role/:token' element={<Customer />} />
        <Route exact path='/addnewCustomer/:username/:role/:token' element={<AddNewCustomer />} />
        <Route exact path='/updateCustomer/:username/:role/:token/:userId/:firstName/:lastName/:email' element={<UpdateCustomer />} />
        <Route exact path='/accounts/:username/:role/:token' element={<Accounts />} />
        <Route exact path='/addnewAccount/:username/:role/:token' element={<AddNewAccount />} />

        <Route exact path='/userdashboard/:username/:role/:token/:userId' element={<UserDashboard />} />
        <Route exact path='/passbook/:username/:role/:token/:userId/:accountNo' element={<Passbook />} />
        <Route exact path='/transaction/:username/:role/:token/:userId' element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default App;
