import React, {Component} from "react"
import {NavLink} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Button, Nav, NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../../store/actions/authActions'
import {readNotification} from '../../../store/actions/adminActions'
import {FaEnvelope, FaCog} from 'react-icons/fa'
import { MdNotifications, MdNotificationsActive} from "react-icons/md";

export class AdminNavbar extends Component{

  static defaultProps = { // <-- DEFAULT PROPS
    notifications: []       
  }

  state = {
    loading: 0
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    
    if(this.props.hires){
        this.setState({
            loading: 0
        });
    }
  }

  render(){
    const {notifications} = this.props
    
    const load = this.state.loading === 0 ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{position: 'fixed'}}>
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav className="justify-content-end mr-auto" style={{ width: "85%" }}>
            <Nav.Link><NavLink to='/admin/addhire' style={{textDecoration: 'none'}}>+Add Hire</NavLink></Nav.Link>
            <Nav.Link><NavLink to={'/admin/messages/' + this.props.auth.uid}><FaEnvelope size={28}/></NavLink></Nav.Link>
  
            <NavDropdown title={notifications.length === 0 ? <MdNotifications size={28}/> : <MdNotificationsActive size={28} />} id="basic-nav-dropdown" disabled={!notifications.length}>
              {notifications && notifications.map(notification => {
                return(
                <div>
                  <NavDropdown.Item><Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'black'}}>{notification.data}</Nav.Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                </div>
                )
              })}
            </NavDropdown>
 
            <NavDropdown title={<FaCog size={28}/>} id="basic-nav-dropdown">
              <NavDropdown.Item>Change Email/Password</NavDropdown.Item>
              <NavDropdown.Item>Manage Hire Charges</NavDropdown.Item>
              <NavDropdown.Item><NavLink to={'/'}><Button onClick={this.props.signOut}>Logout</Button></NavLink></NavDropdown.Item>
            </NavDropdown>
              {/* <Nav.Link><NavLink to={'/' } ><Button className="warning" onClick={props.signOut}>Logout</Button></NavLink></Nav.Link> */}
            </Nav>
        </div>
      </nav>
    ) : <div>loading</div>
    return <div>{load}</div>
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'notifications'}
  ])
)(AdminNavbar)
