import React, {Component} from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Badge} from 'react-bootstrap'
import AddDriver from './AddDriver'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment  from 'moment'
import { ReactTabulator } from 'react-tabulator'



class Drivers extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }

    render () {
        const {auth,type, drivers} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        global.moment = require("moment");

        const columns = [
            { title: "Name", field: "name", headerFilter:"input" },
            { title: "License No", field: "licenseNo", align: "left", headerFilter:"input"},
            { title: "NIC", field: "nic", headerFilter:"input" },
            { title: "Mobile", field: "mobile", headerFilter:"input"},
            { title: "Email", field: "email", align: "center", headerFilter:"input"},
            { title: "User Since", field: "userSince", align: "center", sorter: "datetime", sorterParams:{format:"MMM Do YYYY"}},         
        ];

        var data = []

        {drivers && drivers.map(driver =>{
            data.push({
                id: driver.id, 
                name: driver.firstName + ' ' + driver.lastName, 
                licenseNo: driver.licenseNo, 
                nic: driver.nic, 
                mobile: driver.mobile, 
                userSince: moment(driver.createdAt.toDate()).format("MMM Do YYYY"), 
                email: driver.email
            })
        }       
        )} 

        var rowClick = (e, row) => {
            let path = '/admin/drivers/' + row.getData().id;
            this.props.history.push(path)
        };
        return(
        // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+ Driver</Button>
                <Collapse isOpen={this.state.collapse}>
                <Card >
                    <CardBody className="centered">
                        <AddDriver></AddDriver>
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
                        <th className="center-align">Name</th>
                        <th className="center-align">License No</th>
                        <th className="center-align">NIC</th>
                        <th className="center-align">Mobile</th>
                        <th className="center-align">User Since</th>
                        <th className="center-align">Status</th>
                        <th className="center-align">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {drivers && drivers.map(driver => {
                        return (
                            <tr key={driver.id}>
                                <td className="center-align">{driver.firstName + ' ' + driver.lastName}</td>
                                <td className="center-align">{driver.licenseNo}</td>
                                <td className="center-align">{driver.nic}</td>
                                <td className="center-align">{driver.mobile}</td>
                                <td className="center-align">{moment(driver.createdAt.toDate()).format("MMM Do YYYY")}</td>
                                <td className="center-align"><Badge variant="primary">On Hire</Badge></td>
                                <td className="center-align">
                                    <Link to={"/admin/drivers/" + driver.id}><button type="button" data-toggle="modal" data-id="" class="edit-details btn btn-primary" data-target="#edit">View</button></Link>
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
    // console.log(state)
    return {
        auth: state.firebase.auth,
        type: state.firebase.profile,
        drivers: state.firestore.ordered.drivers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'drivers'}
    ])
)(Drivers)