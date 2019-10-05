import React, {Component} from 'react'
// import {NavLink} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Exports from './Exports'
import Imports from './Imports'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class Hires extends Component {
    static defaultProps = { // <-- DEFAULT PROPS
        hires: []       
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const importHires = this.props.hires.filter(item => item.hireType === "import" && (item.hireStatus === "completed" || item.hireStatus === "driverPending"))
        const exportHires = this.props.hires.filter(item => item.hireType === "export" && (item.hireStatus === "completed" || item.hireStatus === "driverPending"))
        
        return (
        // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Tabs className="center">
                    <TabList>
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <TabPanel>
                        <Imports importHires={importHires}></Imports>
                    </TabPanel>
                    <TabPanel>
                        <Exports exportHires={exportHires}></Exports>
                    </TabPanel>
                </Tabs>
            </div>
        // </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        hires: state.firestore.ordered.hires
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'hires'}
    ])
)(Hires)