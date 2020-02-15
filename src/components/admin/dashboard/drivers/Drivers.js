import React, {Component} from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import AddDriver from './AddDriver'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment  from 'moment'
import { ReactTabulator } from 'react-tabulator'


// Lists all the drivers in the system with searching and filtering
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
        const {auth, drivers} = this.props
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
        // eslint-disable-next-line
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
                {/* eslint-disable-next-line */}
                <ReactTabulator
                    data={data}
                    ref={ref => (this.ref = ref)}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                    rowClick={rowClick}
                    options={{ pagination: 'local',paginationSize: 10}}
                    invalidOptionWarning={false}
                />
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