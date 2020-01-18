import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Nav, Navbar,NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class SignedInLinks extends React.Component{
    render(){
        const {auth} = this.props
   return(
        
        <Navbar bg="dark" variant="dark" style={{ minWidth: 700, position: 'fixed' }}>
            <div className="container" >
                
            <NavLink to='/'style={{ minWidth: 350 }} ><h3>Trans Global Logistics</h3></NavLink>
            <Nav className="justify-content-end mr-auto" style={{ width: "85%" }}>
                <NavDropdown title='Hires' id="basic-nav-dropdown">
                    <NavDropdown.Item><NavLink to='/User/addHire'style={{textDecoration: 'none',color:'black'}} >Add Hire</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to='/User/UserManageTools' style={{textDecoration: 'none' ,color:'black'}}>Manage Hire</NavLink></NavDropdown.Item>
                </NavDropdown>
                    
                <Nav.Link as={NavLink} to='/' style={{textDecoration: 'none',color:'#C0C0C0'}}>Home</Nav.Link>
                <Nav.Link as={NavLink} to='/about' style={{textDecoration: 'none',color:'#C0C0C0'}}>About</Nav.Link>
                <Nav.Link as={NavLink} to='/services' style={{textDecoration: 'none',color:'#C0C0C0'}}>Services</Nav.Link>
                <Nav.Link as={NavLink} to='/contact' style={{textDecoration: 'none',color:'#C0C0C0'}}>Contact</Nav.Link>
                
                <NavDropdown style={{paddingTop: '5px'}} title={<i class="fas fa-user-circle"></i>} id="basic-nav-dropdown">
                    <NavDropdown.Item><NavLink to={'/User/profile/' + auth.uid} style={{textDecoration: 'none',color:'black'}}>Profile</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to='/User/messages' style={{textDecoration: 'none',color:'black'}}>Messages</NavLink></NavDropdown.Item>
                    <NavDropdown.Item><NavLink to={'/'}><Button onClick={this.props.signOut}>Logout</Button></NavLink></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={NavLink} to='/' style={{textDecoration: 'none' ,paddingTop:'12px',color:'#C0C0C0',paddingRight:'25px'}}><i class="fas fa-bell"></i></Nav.Link>

            </Nav>
            </div> 
        </Navbar>       
    )
    }
    
}
const mapStateToProps=(state)=>{
    //console.log(state);
    return{
        auth: state.firebase.auth,
        customers: state.firestore.ordered.customers

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'customers'}
    ])
)(SignedInLinks)
