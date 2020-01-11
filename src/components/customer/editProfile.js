import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card,Image} from 'react-bootstrap'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {editUser} from '../../store/actions/adminActions'
import { Link } from 'react-router-dom'
import image from '../../img/importreq.jpg'


class EditProfile extends Component {

    state = {
        id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        loading: 1,
        updated: 0

    }
    componentWillReceiveProps(nextProps) {
        
        if(this.props.customer){
            this.setState({
                ...nextProps.customer[0],loading: 0,updated: !this.state.updated
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props.id, this.state, 'customers')
        this.setState({
            updated: '1'
        })
    }

    render() {
        
        const load = this.state.loading === 0 ? (
            <div style={{   margin:'0',padding:'0' ,marginBottom:'0'}}>
                <br/><br/><br/><br/>
                <div >
                    <div className='cust-heading' style={{backgroundColor: "#dee7e7",height:'150px'}}>
                    <hr/> 
                <h1 style={{float:'left'}}> PROFILE <br/>Welcome</h1> 
                <Link to='/User/profile'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
                 <hr/>
                    </div>
            <div className="container" style={{ backgroundColor:'white'}}  >
               <div className='row ' >
                    <div className='col-md-8'>
                    {/* <div className="green-text center">
                        <h4>{this.state.updated==='1'? "Updated Successfully" : null}</h4>
                    </div> */}
                    {/* <img src={require('../../img/user.png')}> </img> */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="row main-section">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>First name</h6>
                                <input placeholder="First Name" type="text" id="firstName" value={this.state.firstName}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Last name</h6>
                                <input placeholder="Last Name" type="text" id="lastName" value={this.state.lastName}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Mobile No</h6>
                                <input placeholder="Mobile" type="text" id="mobile" value={this.state.mobile} onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Date of Birth</h6>
                                <input placeholder="Date of Birth" onFocus={this.handleDate} type="text" id="dob" value={this.state.dob} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row ">
                                <h6 className='blue-text'>NIC</h6>
                                <input placeholder="NIC No" type="text" id="nic" value={this.state.nic}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Email</h6>
                                <input placeholder="Email" type="email" id="email" value={this.state.email}  onChange={this.handleChange} required />
                            </div>
                        </div><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-0">Update</button>
                            <Link to='/User/profile'><button className="btn silver lighten-1 z-depth-0">Cancel</button></Link>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <Card>
                    <button className='primary'>Email recovery</button>
                    <button></button>
                    </Card>
                    

                </div>
            </div>
            </div>
         </div>
              
                </div>  
        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
      
    }
}

const mapStateToProps = (state, ownProps) => {
    
    let id = ownProps.match.params.id;
    return{
        id: id,
        customer: state.firestore.ordered.customers,
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return{
        editUser: (id, customer, collec) => dispatch(editUser(id,customer,collec))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props => [{
        collection: 'customers',
        doc: props.id
    }])
)(EditProfile)
