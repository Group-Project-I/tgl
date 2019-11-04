import React, {Component} from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import AddCustomer from './AddCustomer'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'


class Customers extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }

    render () {
        const {auth, customers} = this.props
        if (!localStorage.getItem('userId')) return <Redirect to='/signin' />

        const columns = [
            { title: "Name", field: "name", headerFilter:"input" },
            { title: "Email", field: "email", headerFilter:"input"},
            { title: "Mobile", field: "mobile", headerFilter:"input"},
            { title: "NIC", field: "nic", headerFilter:"input" },          
            { title: "User Since", field: "createdAt", align: "center"},
            
        ];

        var data = []

        {customers && customers.map(customer =>{
            data.push({
                id: customer.id, 
                name: customer.firstName + ' ' + customer.lastName, 
                nic: customer.nic, 
                mobile: customer.mobile, 
                createdAt: moment(customer.createdAt.toDate()).format("MMM Do YYYY"), 
                email: customer.email
            })
        }       
        )} 

        var rowClick = (e, row) => {
            let path = '/admin/customers/' + row.getData().id;
            this.props.history.push(path)
        };

        return(
        // <div className="main-panel">
       
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+ Customer</Button>
                <Collapse isOpen={this.state.collapse}>
                <Card >
                    <CardBody className="centered">
                        <AddCustomer></AddCustomer>
                    </CardBody>
                </Card>
                </Collapse>

                <ReactTabulator
                    data={data}
                    ref={ref => (this.ref = ref)}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                    rowClick={rowClick}
                    options={{ pagination: 'local',paginationSize: 10}}
                />
                {/* <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>NIC</th>
                        <th>User Since</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers && customers.map(customer => {
                        return(
                            <tr key={customer.id}>
                                <td>{customer.firstName + ' ' + customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.nic}</td>
                                <td>{moment(customer.createdAt.toDate()).format("MMM Do YYYY")}</td>
                                <td>
                                    <Link to={'/admin/customers/' + customer.id}><button type="button" data-toggle="modal" data-id="" class="edit-details btn btn-primary" data-target="#edit">View</button></Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table> */}
            </div>
        // </div>
    )
        }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        customers: state.firestore.ordered.customers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'customers'}
    ])
)(Customers)