import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import EditDriver from './EditDriver'
import Exports from '../hires/Exports'
import Imports from '../hires/Imports'
import DisableAccount from '../DisableAccount'
import DriverProfile from './DriverProfile'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';

// Connects all conmponenet relevant to a given driver
class ManageDriver extends Component {
    static defaultProps = { 
        hires: []       
    }

    state = {
        loading: 1
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.driver){
            this.setState({
                loading: 0
            });
        }
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const importHires = this.props.hires.filter(item => item.hireType === "import" && item.driverId === this.props.id)
        const exportHires = this.props.hires.filter(item => item.hireType === "export" && item.driverId === this.props.id)
        
        const load = this.state.loading === 0 ? (
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>

                <DriverProfile driver={this.props.driver[0]} id={this.props.id}></DriverProfile>

                <Tabs className="center">
                    <TabList className="left">
                        <Tab>Hires</Tab>
                        <Tab>Edit Profile</Tab>
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
                                <Imports importHires={importHires}></Imports>
                            </TabPanel>
                            <TabPanel>
                                <Exports exportHires={exportHires}></Exports>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                    <TabPanel>
                        <EditDriver driver={this.props.driver[0]} id={this.props.id}></EditDriver>
                    </TabPanel>
                    <TabPanel>
                        <DisableAccount user={this.props.driver[0]} id={this.props.id} type='drivers'></DisableAccount>
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
        driver: state.firestore.ordered.drivers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'drivers', doc: props.id}
    ])
)(ManageDriver)