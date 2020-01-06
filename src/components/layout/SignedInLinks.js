import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {Button, Nav, Navbar,Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    return(
        <Navbar bg="dark" variant="dark" style={{ minWidth: 700, position: 'fixed' }}>
            <div className="container" >
                
                <NavLink to='/'style={{ minWidth: 350 }} ><h3>Trans Global Logistics</h3></NavLink>
                <Nav className="justify-content-end mr-auto" style={{ width: "80%" }}>
                    <Nav.Link><Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic"> Hires   </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item  ><NavLink to='/User/addHire'style={{textDecoration: 'none',color:'black'}} >+Add Hire</NavLink></Dropdown.Item>
                        <Dropdown.Item ><NavLink to='/User/UserManageTools' style={{textDecoration: 'none' ,color:'black'}}>Manage Hire</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown></Nav.Link>
                    <Nav.Link><NavLink to='/' style={{textDecoration: 'none'}}>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/about' style={{textDecoration: 'none'}}>About</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/services' style={{textDecoration: 'none'}}>Services</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/contact'style={{textDecoration: 'none'}}>Contact</NavLink></Nav.Link>
                    <Nav.Link><Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                        <i class="fas fa-user-circle"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item ><NavLink to='/User/profile' style={{textDecoration: 'none',color:'black'}}>Profile</NavLink></Dropdown.Item>
                        <Dropdown.Item ><NavLink to='/User/messages' style={{textDecoration: 'none',color:'black'}}>Messages</NavLink></Dropdown.Item>
                        <NavLink to='/'><Dropdown.Item ><Button onClick={props.signOut}style={{textDecoration: 'none'}}>Logout</Button></Dropdown.Item></NavLink>
                        </Dropdown.Menu>
                    </Dropdown></Nav.Link>
                    {/* <Nav.Link> <NavLink to='/'><Button onClick={props.signOut} style={{textDecoration: 'none'}}>Logout</Button></NavLink></Nav.Link> */}
                    <Nav.Link><NavLink to='/' style={{textDecoration: 'none' ,paddingTop:'20px'}}><i class="fas fa-bell"></i></NavLink></Nav.Link>

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
