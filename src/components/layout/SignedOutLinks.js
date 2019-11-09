import React from 'react'
import {NavLink} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav} from 'react-bootstrap'
// import {Link} from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        
        <Navbar bg="dark" expand="lg" variant="dark" style={{ position: 'fixed' }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div className="container">
                <NavLink to='/'style={{ minWidth: 310, textDecoration:'none' }} ><h3>Trans Global Logistics</h3></NavLink>
                <Navbar.Collapse>
                <Nav className="justify-content-end mr-auto" style={{ width: "100%" }}>
                    <Nav.Link><NavLink to='/' style={{textDecoration: 'none'}}>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/about' style={{textDecoration: 'none'}}>About</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/services' style={{textDecoration: 'none'}}>Services</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/contact' style={{textDecoration: 'none'}}>Contact</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/signin' style={{textDecoration: 'none'}}><Button variant="primary">Login</Button></NavLink></Nav.Link>
                </Nav>
                </Navbar.Collapse>
                
            </div>
        </Navbar>
        
        
    )
}

export default SignedOutLinks;
