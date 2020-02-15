import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import AdminNavbar from '../admin/layout/AdminNavbar'
import {connect} from 'react-redux'

// Navbar is selected based on the user type of the user logged in 
const Navbar = (props) => {

    const {auth, type,profile} = props

    const links = auth.uid && type.userType === 'customer' && type.disabled === false ? <SignedInLinks profile={profile}/> :  (auth.uid && type.userType === 'admin' ? <><AdminNavbar/> </> : <SignedOutLinks/> );
    return(
        <div>
            {links}
        </div>
    )
}

// Gets the user type from firebase authentication
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        type: state.firebase.profile,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);