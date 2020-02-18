import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Nav, Navbar,NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {readNotification} from '../../store/actions/adminActions'
import { MdNotifications, MdNotificationsActive, MdBeenhere, MdEventAvailable, MdEdit, MdPersonAdd} from "react-icons/md";

import { GoIssueReopened } from "react-icons/go"
  
// Links visible for the signed in user 
export class SignedInLinks extends React.Component{
    static defaultProps = { // <-- DEFAULT PROPS
        notifications: []       
      }
      state = {
        loading: 0,
        show: false
      }
    render(){
        const {auth} = this.props
        const notifications = this.props.notifications.filter(item => item.to=== auth.uid)
        const load = this.state.loading === 0 ? (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{ minWidth: 700, position: 'fixed' }}>
      
            <div className="container" >
                
            <NavLink to='/'style={{ minWidth: 350 }} ><h3>Trans Global Logistics</h3></NavLink>
            <Nav className="justify-content-end mr-auto" style={{ width: "90%" }}>
                <NavDropdown title='Hires' id="basic-nav-dropdown">
                    <NavDropdown.Item><NavLink to='/User/addHire'style={{textDecoration: 'none',color:'black'}} >Add Hire</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to='/User/UserManageTools' style={{textDecoration: 'none' ,color:'black'}}>Manage Hire</NavLink></NavDropdown.Item>
                </NavDropdown>
                    
                <Nav.Link as={NavLink} to='/' style={{textDecoration: 'none',color:'white'}}>Home</Nav.Link>
                <Nav.Link as={NavLink} to='/about' style={{textDecoration: 'none',color:'white'}}>About</Nav.Link>
                <Nav.Link as={NavLink} to='/services' style={{textDecoration: 'none',color:'white'}}>Services</Nav.Link>
                <Nav.Link as={NavLink} to='/contact' style={{textDecoration: 'none',color:'white'}}>Contact</Nav.Link>
                
                <NavDropdown style={{paddingTop: '5px'}} title={<i class="fas fa-user-circle"></i>} id="basic-nav-dropdown">
                    <NavDropdown.Item><NavLink to={'/User/profile/' + auth.uid} style={{textDecoration: 'none',color:'black'}}>Profile</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to={'/'}><Button onClick={this.props.signOut}>Logout</Button></NavLink></NavDropdown.Item>
                </NavDropdown>
                
                <NavDropdown title={notifications.length === 0 ? <MdNotifications size={28}/> : <MdNotificationsActive size={28}/>} id="basic-nav-dropdown" disabled={!notifications.length} style={{width:'150px'}}>
              {notifications && notifications.map(notification => {
                return(
                <div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{ margin:0, padding:'0px 0px',width:'350px',height:'100px'}}>
                    {notification.type === 'hire accepted' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'orange',backgroundColor:'#FFFACD',width:'100',height:'100px'}}>
                        <h6><MdEventAvailable size={28} /> <b>{notification.data}</b></h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> 
                      : ( notification.type === 'hire declined' ?
                        <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'red',backgroundColor:'#ffe6f0',height:'100px'}}>
                          <h6><GoIssueReopened size={28} /> <b>{notification.data}</b></h6>
                          {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                        </Nav.Link> 
                      :(notification.type === 'hire completed' ?
                        <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'green',backgroundColor:'#9ACD32',height:'100px'}}>
                          <h6><MdBeenhere size={28} /> <b>{notification.data}</b></h6>
                          {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                        </Nav.Link> 
                      : (notification.type === 'new message' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'blue',backgroundColor:'#9ACD32',height:'100px'}}>
                        <h6><MdBeenhere size={28} /> <b>{notification.data}</b></h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> 
                      :null)))
                    }
                  </NavDropdown.Item>  
                </div>
                )
              })}
            </NavDropdown>

            </Nav>
            </div> 
           
      </nav>
    ) : <div>loading</div>
    return <div>{load}</div>
              
    
    }
    
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        customers: state.firestore.ordered.customers,
        notifications: state.firestore.ordered.notifications

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        readNotification: (id) => dispatch(readNotification(id))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'customers'},
        {collection: 'notifications'}

    ])
)(SignedInLinks)
