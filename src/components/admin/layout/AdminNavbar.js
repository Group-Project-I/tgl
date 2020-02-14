import React, {Component} from "react"
import {NavLink} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Button, Nav, NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../../store/actions/authActions'
import {readNotification} from '../../../store/actions/adminActions'
import {FaEnvelope, FaCog} from 'react-icons/fa'
import { MdNotifications, MdNotificationsActive, MdBeenhere, MdEventAvailable, MdEdit, MdPersonAdd} from "react-icons/md";
import Modal from 'react-bootstrap/Modal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChangeAdminEmail from '../layout/changeAuthenticationDetails/ChangeAdminEmail'
import ChangeAdminPassword from '../layout/changeAuthenticationDetails/ChangeAdminPassword'
import { Badge } from 'react-md'

export class AdminNavbar extends Component{

  static defaultProps = { 
    notifications: []       
  }

  state = {
    loading: 0,
    show: false,
    messages: ''
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    
    if(this.props.chat){
        this.setState({
            loading: 0,
            messages: this.props.chat.filter(item => item.read === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2').length
        });
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = (e) => {
    e.preventDefault()
    this.setState({
      show: true
    })
  }

  // Admin Navbar, counts of notifications and messages are updated through the component 
  render(){
    const notifications = this.props.notifications.filter(item => item.to === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2').sort((a, b) => new Date((b.createdAt.seconds + b.createdAt.nanoseconds/1E9)*1000) - new Date((a.createdAt.seconds + a.createdAt.nanoseconds/1E9)*1000))
    var count = 0;
    if(this.props.chat){
      count = this.props.chat.filter(item => item.read === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2').length
    } 

    const load = this.state.loading === 0 ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{position: 'fixed'}}>
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav className="justify-content-end mr-auto" style={{ width: "85%" }}>
            <Nav.Link as={NavLink} to='/admin/addhire' style={{textDecoration: 'none'}}>+Add Hire</Nav.Link>
            <Nav.Link as={NavLink} style={{paddingRight:'4px'}} to={'/admin/chat/' + this.props.auth.uid}><FaEnvelope size={28}/></Nav.Link>
            <Badge badgeContent={count} primary badgeId="notifications-1" />
            <NavDropdown className="navNotif" title={notifications.length === 0 ? <MdNotifications size={28}/> : <MdNotifications size={28}/>} id="basic-nav-dropdown" disabled={!notifications.length}>
              {notifications && notifications.map(notification => {
                return(
                <div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{ border:'2px solid black', padding:'3.75px 0px', width:'330px'}}>
                    {notification.type === 'hire completed' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'green'}}>
                        <h6><MdEventAvailable size={28}/> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : ( notification.type === 'driver accepted' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'blue'}}>
                        <h6><MdBeenhere size={28} /> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : (notification.type === 'details updated' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'orange'}}>
                        <h6><MdEdit size={28} /> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : (notification.type === 'new user' ?
                      <Nav.Link onClick={ () => this.props.readNotification(notification.id) } as={NavLink} to={notification.link} style={{color: 'purple'}}>
                        <h6><MdPersonAdd size={28} /> {notification.data}</h6>
                        {new Date((notification.createdAt.seconds + notification.createdAt.nanoseconds/1E9)*1000).toString().substr(0,24)}
                      </Nav.Link> : null)))
                    }
                  </NavDropdown.Item>  
                </div>
                )
              })}
            </NavDropdown>
            <Badge badgeContent={notifications.length} primary badgeId="notifications-1" />

            <NavDropdown title={<FaCog size={28}/>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.handleShow}>Change Email/Password</NavDropdown.Item>
              <NavDropdown.Item><NavLink to={'/admin/hireCharges'} className="black-text" style={{textDecoration: 'none'}}>Manage Hire Charges</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink to={'/'}><Button onClick={this.props.signOut}>Logout</Button></NavLink></NavDropdown.Item>
            </NavDropdown>

            <Modal show={this.state.show} onHide={this.handleClose} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
              <Modal.Header closeButton>
                <Modal.Title>Change Email/Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tabs className="center">
                    <TabList>
                        <Tab>Change Email</Tab>
                        <Tab>Change Password</Tab>
                    </TabList>
                    <TabPanel>
                      <ChangeAdminEmail></ChangeAdminEmail>
                    </TabPanel>
                    <TabPanel>
                      <ChangeAdminPassword></ChangeAdminPassword>
                    </TabPanel>
                </Tabs>
              </Modal.Body>
            </Modal>
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
    notifications: state.firestore.ordered.notifications,
    chat: state.firestore.ordered.chats
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      signOut: () => dispatch(signOut()),
      readNotification: (id) => dispatch(readNotification(id))
  }
}

// Connects to notifications and chats collections for real time updates
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'notifications'},
    {collection: 'chats'}
  ])
)(AdminNavbar)
