import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Nav, Navbar,NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {readNotification} from '../../store/actions/adminActions'
import { MdNotifications, MdNotificationsActive, MdBeenhere, MdEventAvailable, MdEdit, MdPersonAdd} from "react-icons/md";



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
        const notifications = this.props.notifications.filter(item => item.to=== auth.uid).sort((a, b) => new Date((b.createdAt.seconds + b.createdAt.nanoseconds/1E9)*1000) - new Date((a.createdAt.seconds + a.createdAt.nanoseconds/1E9)*1000))

        const load = this.state.loading === 0 ? (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{ minWidth: 700, position: 'fixed' }}>
        
{/* //    return( */}
        
        {/* <Navbar bg="dark" variant="dark" style={{ minWidth: 700, position: 'fixed' }}> */}
            <div className="container-fluid" >
                
            <NavLink to='/'style={{ minWidth: 350 }} ><h3>Trans Global Logistics</h3></NavLink>
            <Nav className="justify-content-end mr-auto" style={{ width: "90%" }}>
                <NavDropdown title='Hires' id="basic-nav-dropdown">
                    <NavDropdown.Item><NavLink to='/User/addHire'style={{textDecoration: 'none',color:'black'}} >Add Hire</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to='/User/UserManageTools' style={{textDecoration: 'none' ,color:'black'}}>Manage Hire</NavLink></NavDropdown.Item>
                </NavDropdown>
                    
                <Nav.Link><NavLink to='/' style={{textDecoration: 'none'}}>Home</NavLink></Nav.Link>
                <Nav.Link><NavLink to='/about' style={{textDecoration: 'none'}}>About</NavLink></Nav.Link>
                <Nav.Link><NavLink to='/services' style={{textDecoration: 'none'}}>Services</NavLink></Nav.Link>
                <Nav.Link><NavLink to='/contact'style={{textDecoration: 'none'}}>Contact</NavLink></Nav.Link>
                
                <NavDropdown title={<i class="fas fa-user-circle"></i>} id="basic-nav-dropdown">
                <NavDropdown.Item><NavLink to={'/User/profile/' + auth.uid} style={{textDecoration: 'none',color:'black'}}>Profile</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to='/User/messages' style={{textDecoration: 'none',color:'black'}}>Messages</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to={'/'}><Button onClick={this.props.signOut}>Logout</Button></NavLink></NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link><NavLink to='#' style={{textDecoration: 'none' ,paddingTop:'20px',color:'#C0C0C0'}}><i class="fas fa-bell"></i></NavLink></Nav.Link> */}
                
                <NavDropdown title={notifications.length === 0 ? <MdNotifications size={28}/> : <MdNotificationsActive size={28}/>} id="basic-nav-dropdown" disabled={!notifications.length}>
              {notifications && notifications.map(notification => {
                return(
                <div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{ border:'2px solid black', padding:'3.75px 0px'}}>
                    {notification.type === 'hire accepted' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'orange'}}>
                        <h6><MdEventAvailable size={28}/> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : ( notification.type === 'hire declined' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'red'}}>
                        <h6><MdBeenhere size={28} /> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : null)
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
    //console.log(state);
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
