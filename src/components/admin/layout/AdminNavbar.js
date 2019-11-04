import React from "react"
import {NavLink} from 'react-router-dom'
import {Button, Nav, NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {signOut} from '../../../store/actions/authActions'
import {FaBell, FaEnvelope, FaBars} from 'react-icons/fa'


const AdminNavbar = (props) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{position: 'fixed'}}>
      <button className="btn btn-primary" id="menu-toggle"><FaBars/></button>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Nav className="justify-content-end mr-auto" style={{ width: "85%" }}>
          <Nav.Link><NavLink to='/admin/addhire' style={{textDecoration: 'none'}}>+Add Hire</NavLink></Nav.Link>
          <Nav.Link><NavLink to={'/admin/messages/' + props.auth.uid}><FaEnvelope size={28}/></NavLink></Nav.Link>

          <NavDropdown title={<FaBell size={28}/>} id="basic-nav-dropdown">
            <NavDropdown.Item >Action</NavDropdown.Item>
            <NavDropdown.Item >Another action</NavDropdown.Item>
            <NavDropdown.Item >Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >Separated link</NavDropdown.Item>
          </NavDropdown>

            <Nav.Link><NavLink to={'/' } ><Button onClick={props.signOut}>Logout</Button></NavLink></Nav.Link>

          </Nav>
      </div>
  </nav>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
