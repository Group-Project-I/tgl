import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser} from '../../../../store/actions/adminActions'


// Form to edit customer details
class EditCustomer extends Component {

    state = {
        id: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        loading: 1,
        updated: 1

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
            updated: 1
        })
    }
    componentWillMount(){
        if(this.props.customer){
            this.setState({
                ...this.props.customer,loading: 0,updated: !this.state.updated
            });
        }
    }

    render() {
        const load = this.state.loading === 0 ? (
            <div className="container">
                    <h2 className="center" style={{paddingTop: '50px'}}>Edit Customer</h2><br/><br/>
                    <div className="green-text center">
                        <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
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
                        </div><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-0">Update</button>
                        </div>
                    </form>
                </div>
                
        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        editUser: (id, customer, collec) => dispatch(editUser(id,customer,collec))
    }
}

export default connect(null, mapDispatchToProps)(EditCustomer)