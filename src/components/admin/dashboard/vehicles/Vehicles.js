import React, {Component} from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import AddVehicle from './AddVehicle'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'

// Lists all the available vehicles with searching and filtering
class Vehicles extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    static defaultProps = {
        vehicles: []       
    }
    
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render () {
        const {auth, vehicles} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const columns = [
            { title: "Vehicle No", field: "vehicleNo", width: 150, headerFilter:"input" },
            { title: "Make", field: "make", align: "left", headerFilter:"input"},
            { title: "Model", field: "model", headerFilter:"input" },
            { title: "Trailer No", field: "trailerNo", headerFilter:"input"},
            { title: "Purchased Date", field: "purchasedDate", align: "center"},
            { title: "Engine No", field: "engineNo", align: "center"},
        ];

        var data = []
        /* eslint-disable-next-line */
        // eslint-disable-next-line
        {vehicles && vehicles.map(vehicle =>{
            data.push({
                id: vehicle.id, 
                vehicleNo: vehicle.vehicleNo, 
                make: vehicle.make, 
                model: vehicle.model, 
                trailerNo: vehicle.trailerNo, 
                purchasedDate: vehicle.purchasedDate, 
                engineNo: vehicle.engineNo
            })
        }       
        )} 

        var rowClick = (e, row) => {
            let path = '/admin/vehicles/' + row.getData().id;
            this.props.history.push(path)
        };
        return(
                <div id="content" className="container-fluid" role="main">
                    <br/><br/><br/><br/>
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+ Vehicle</Button>
                    <Collapse isOpen={this.state.collapse}>
                    <Card >
                        <CardBody className="centered">
                            <AddVehicle></AddVehicle>
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
                </div>
    )
        }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        vehicles: state.firestore.ordered.vehicles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'vehicles'}
    ])
)(Vehicles)