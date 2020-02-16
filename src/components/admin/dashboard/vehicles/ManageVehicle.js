import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import EditVehicle from './EditVehicle'
import Exports from '../hires/Exports'
import Imports from '../hires/Imports'
import DisableVehicle from './DisableVehicle'
import VehicleProfile from './VehicleProfile'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import { Squares } from 'react-activity'
import 'react-activity/dist/react-activity.css'

// Connects components on the vehicle page 

class ManageVehicle extends Component {
    static defaultProps = { 
        hires: []       
    }

    state = {
        loading: 1
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.vehicle){
            this.setState({
                loading: 0
            });
        }
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        // Filter imports and exports made by the selected vehile
        const importHires = this.props.hires.filter(item => item.hireType === "import" && item.vehicleId === this.props.id)
        const exportHires = this.props.hires.filter(item => item.hireType === "export" && item.vehicleId === this.props.id)
        
        const load = this.state.loading === 0 ? (
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>

                <VehicleProfile vehicle={this.props.vehicle[0]} id={this.props.id}></VehicleProfile>

                <Tabs className="center">
                    <TabList className="left">
                        <Tab>Hires</Tab>
                        <Tab>Edit Vehicle</Tab>
                        <Tab>Settings</Tab>
                    </TabList>
                    <br/><br/>
                    <TabPanel>
                        <Tabs className="center">
                            <TabList>
                                <Tab>Imports</Tab>
                                <Tab>Exports</Tab>
                            </TabList>
                            <TabPanel>
                                <Imports importHires={importHires} history={this.props.history}></Imports>
                            </TabPanel>
                            <TabPanel>
                                <Exports exportHires={exportHires} history={this.props.history}></Exports>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                    <TabPanel>
                        <EditVehicle vehicle={this.props.vehicle[0]} id={this.props.id}></EditVehicle>
                    </TabPanel>
                    <TabPanel>
                        <DisableVehicle vehicle={this.props.vehicle[0]} id={this.props.id}></DisableVehicle>
                    </TabPanel>
                </Tabs>
            </div>
        ): <div className="text-center" style={{paddingTop:"500px"}}><Squares color="#007bff" size={32} speed={1} animating={true} /></div>
        return <div>{load}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        auth: state.firebase.auth,
        hires: state.firestore.ordered.hires,
        vehicle: state.firestore.ordered.vehicles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'vehicles', doc: props.id}
    ])
)(ManageVehicle)