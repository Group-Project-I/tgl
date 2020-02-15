import React from 'react'
import {NavLink} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav} from 'react-bootstrap'
import { FaAlignJustify } from "react-icons/fa";

// Signed out links for unregistered customers
const SignedOutLinks = () => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark" style={{ position: 'fixed' }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div className="container">
                <NavLink to='/'style={{ minWidth: 310, textDecoration:'none' }} ><h3>Trans Global Logistics</h3></NavLink>
                <Navbar.Collapse>
                <Nav className="justify-content-end mr-auto" style={{ width: "100%" }}>
                    <Nav.Link as={NavLink} to='/' style={{textDecoration: 'none'}}>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='/about' style={{textDecoration: 'none'}}>About</Nav.Link>
                    <Nav.Link as={NavLink} to='/services' style={{textDecoration: 'none'}}>Services</Nav.Link>
                    <Nav.Link as={NavLink} to='/contact' style={{textDecoration: 'none'}}>Contact</Nav.Link>
                    <Nav.Link as={NavLink} to='/signin' style={{textDecoration: 'none'}}><Button variant="primary">Login</Button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
                
             </div>
         </Navbar>
        
        
    )
}
 
export default SignedOutLinks;
