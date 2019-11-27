import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import EditCustomer from './EditCustomer'
import Exports from '../hires/Exports'
import Imports from '../hires/Imports'
import DisableAccount from '../DisableAccount'
import CustomerProfile from './CustomerProfile'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class ManageCustomer extends Component {
    static defaultProps = { 
        hires: []       
    }

    state = {
        loading: 1
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if(this.props.customer){
            this.setState({
                loading: 0
            });
        }
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const importHires = this.props.hires.filter(item => item.hireType === "import" && item.customerId === this.props.id)
        const exportHires = this.props.hires.filter(item => item.hireType === "export" && item.customerId === this.props.id)
        
        const load = this.state.loading === 0 ? (
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>

                <CustomerProfile customer={this.props.customer[0]} id={this.props.id}></CustomerProfile>

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
                                <Imports importHires={importHires} history={this.props.history}></Imports>
                            </TabPanel>
                            <TabPanel>
                                <Exports exportHires={exportHires} history={this.props.history}></Exports>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                    <TabPanel>
                        <EditCustomer customer={this.props.customer[0]} id={this.props.id}></EditCustomer>
                    </TabPanel>
                    <TabPanel>
                        <DisableAccount user={this.props.customer[0]} id={this.props.id} type='customers'></DisableAccount>
                    </TabPanel>
                </Tabs>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        auth: state.firebase.auth,
        hires: state.firestore.ordered.hires,
        customer: state.firestore.ordered.customers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'customers', doc: props.id}
    ])
)(ManageCustomer)