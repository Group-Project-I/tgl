import React, {Component} from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import AddCustomer from './AddCustomer'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of customers registered in the system with filtering and sorting
class Customers extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false};
        this.state.urlPath = "customers"
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }

    render () {
        const {customers} = this.props
        if (!localStorage.getItem('userId')) return <Redirect to='/signin' />

        global.moment = require("moment");

        const columns = [
            { title: "Name", field: "name", headerFilter:"input" },
            { title: "Email", field: "email", headerFilter:"input"},
            { title: "Mobile", field: "mobile", headerFilter:"input"},
            { title: "NIC", field: "nic", headerFilter:"input" },          
            { title: "User Since", field: "createdAt", align: "center", sorter: "date", sorterParams:{format:"MMM Do YYYY"}},
            
        ];

        var data = []
        // eslint-disable-next-line
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
                    invalidOptionWarnings={false}
                />
            </div>
    )
        }
}

const mapStateToProps = (state) => {
    // console.log(state)
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