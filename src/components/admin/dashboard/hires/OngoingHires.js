import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import OngoingExports from './OngoingExports'
import OngoingImports from './OngoingImports'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


// Connects ongoing imports and exports 
class OngoingHires extends Component {
    static defaultProps = { // <-- DEFAULT PROPS
        hires: []       
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        // FIlter hires based on hire type and hire status
        const ongoingImportHires = this.props.hires.filter(item => item.hireType === "import" && item.hireStatus === 'ongoing')
        const ongoingExportHires = this.props.hires.filter(item => item.hireType === "export" && item.hireStatus === 'ongoing')
        
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
                        <OngoingImports ongoingImportHires={ongoingImportHires} history={this.props.history}></OngoingImports>
                    </TabPanel>
                    <TabPanel>
                        <OngoingExports ongoingExportHires={ongoingExportHires} history={this.props.history}></OngoingExports>
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
)(OngoingHires)