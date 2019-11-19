import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {Button, Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    return(
        <Navbar bg="dark" variant="dark" style={{ minWidth: 700, position: 'fixed' }}>
            <div className="container" >
                
                <NavLink to='/'style={{ minWidth: 350 }} ><h3>Trans Global Logistics</h3></NavLink>
                <Nav className="justify-content-end mr-auto" style={{ width: "85%" }}>
                    <Nav.Link><NavLink to='/User/addHire' style={{textDecoration: 'none'}}>+AddHire</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/User/UserManageTools'style={{textDecoration: 'none'}}>ManageHire</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/User/Home' style={{textDecoration: 'none'}}>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/about' style={{textDecoration: 'none'}}>About</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/services' style={{textDecoration: 'none'}}>Services</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/contact'style={{textDecoration: 'none'}}>Contact</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/User/profile' style={{textDecoration: 'none'}} ><i class="fas fa-user-circle"></i></NavLink></Nav.Link>
                    <Nav.Link> <NavLink to='/'><Button onClick={props.signOut} style={{textDecoration: 'none'}}>Logout</Button></NavLink></Nav.Link>

                </Nav>
            </div> 
        </Navbar>       
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(SignedInLinks);
