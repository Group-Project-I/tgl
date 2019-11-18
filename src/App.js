import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Homepage from './components/dashboard/Homepage'
import About from './components/dashboard/About'
import Services from './components/dashboard/Services'
import Contact from './components/dashboard/Contact'
import ErrorPage from './components/dashboard/ErrorPage'
import Footer from './components/layout/Footer'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import {connect} from 'react-redux'

// Admin
import AdminDashboard from './components/admin/dashboard/AdminDashboard'
import Customers from './components/admin/dashboard/customers/Customers'
import AddCustomer from './components/admin/dashboard/customers/AddCustomer'
import AddDriver from './components/admin/dashboard/drivers/AddDriver'
import AddVehicle from './components/admin/dashboard/vehicles/AddVehicle'
import AddHire from './components/admin/dashboard/hires/AddHire'
import Hires from './components/admin/dashboard/hires/Hires'
import Drivers from './components/admin/dashboard/drivers/Drivers'
import Vehicles from './components/admin/dashboard/vehicles/Vehicles'
import AdminSidebar from './components/admin/layout/AdminSidebar'
import HireRequests from './components/admin/dashboard/hires/HireRequests'
import OngoingHires from './components/admin/dashboard/hires/OngoingHires'
import ManageHire from './components/admin/dashboard/hires/ManageHire'
// import ManageHireRequest from './components/admin/dashboard/ManageHireRequest'

import ManageCustomer from './components/admin/dashboard/customers/ManageCustomer'
import ManageDriver from './components/admin/dashboard/drivers/ManageDriver'
import ManageVehicle from './components/admin/dashboard/vehicles/ManageVehicle'
import DisabledUsers from './components/admin/dashboard/DisabledUsers'

//customer
import CustomerAddHire from './components/customer/customerAddHire'
import Dashboard from './components/customer/dashboard'
import Profile from './components/customer/profile'
import EditProfile from './components/customer/editProfile'
import ResetPassword from './components/customer/authRecovery/resetPassword'
import PasswordChange from './components/customer/authRecovery/resetPassword'
import ResetEmail from './components/customer/authRecovery/resetEmail'
import Message from './components/customer/message'
import CompletedHires from './components/customer/hires/CustCompletedHires'
import HireRequest from './components/customer/hires/CustHireRequest'
import DeclinedHire from './components/customer/hires/CustDeclinedHires'
import OngoingHire from './components/customer/hires/CustOngoingHire'
import ManageHires from './components/customer/hires/CustManageHires'
import ManageTools from './components/customer/hires/CustManageTools'


function App(props) {
  
  const {type, auth} = props;

  if(type.userType === 'admin'){
    localStorage.setItem("userId", 'admin') 
  }

  const link = type.userType === "admin" ? null : <Footer/>
  const sidebar = localStorage.getItem('userId') === 'admin' ? <AdminSidebar/> : null

  return (
    <BrowserRouter>
      <div className="App">
        <div className={localStorage.getItem('userId') === 'admin' ? "d-flex" : "wrapper"} id={type.userType === 'admin' ? "wrapper" : null}>
          {sidebar}
          <div id={localStorage.getItem('userId') === 'admin' ? "page-content-wrapper" : null} className={type.userType === 'admin' ? "" : null}> 
            <Navbar></Navbar>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/about' component={About}  />
              <Route path='/services' component={Services} />
              <Route path='/contact' component={Contact} />
              <Route path='/error' component={ErrorPage} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              
              <Route exact path='/admin' component={AdminDashboard} />
              <Route exact path='/admin/customers' component={Customers} />
              <Route path='/admin/addcustomer' component={AddCustomer} />
              <Route exact path='/admin/drivers' component={Drivers} />
              <Route path='/admin/adddriver' component={AddDriver} />
              <Route exact path='/admin/vehicles' component={Vehicles} />
              <Route path='/admin/addvehicle' component={AddVehicle} />
              <Route path='/admin/addhire' component={AddHire} />
              <Route exact path='/admin/hires' component={Hires} />
              <Route exact path='/admin/hirerequests' component={HireRequests} />
              <Route path='/admin/hirerequests/:id' component={ManageHire} />
              <Route path='/admin/ongoinghires' component={OngoingHires} />
              {/* <Route path='/admin/hires/:id' component={ManageHire} /> */}

              <Route path='/admin/customers/:id' component={ManageCustomer} />
              <Route path='/admin/drivers/:id' component={ManageDriver} />
              <Route path='/admin/vehicles/:id' component={ManageVehicle} />
              <Route path='/admin/hires/:id' component={ManageHire} />

              <Route path='/admin/disabled' component={DisabledUsers}/>

              <Route path='/cust/addHire' component={CustomerAddHire}/>
              <Route path='/cust/Home' component={Dashboard}/>
              <Route path='/cust/resetPassword' component={ResetPassword}/>
              <Route path ='/cust/messages' component={Message}/>
              <Route exact path='/cust/profile' component={Profile}/>
              <Route exact path='/cust/profile/:id' component={EditProfile}/>
              <Route path ='/forgetPassword' component={PasswordChange}/>
              <Route path ='/resetEmail' component={ResetEmail}/>
              <Route path='/cust/custHireRequests' component={HireRequest}/>
              <Route path='/cust/custOngoingHires ' component={OngoingHire }/>
              <Route path='/cust/custManageTools' component={ManageTools}/>
              <Route path='/cust/custManageHires/:id' component={ManageHires}/>
              <Route path='/cust/custCompletedHires' component={CompletedHires}/>
              <Route path='/cust/custDeclinedHires' component={DeclinedHire}/>


              
            </Switch>
          </div>
        </div>
        {link}
      </div>
      
    </BrowserRouter> 
  );
}

const mapStateToProps = (state) => {
  console.log('app state',state)
  return {
    type: state.firebase.profile,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
