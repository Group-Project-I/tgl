import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import CompletedExports from './CustCompletedExports'
import CompletedImports from './CustCompletedImports'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class CompletedHires extends Component {
    static defaultProps = { // <-- DEFAULT PROPS
        hires: []
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const completedImportHires = this.props.hires.filter(item => item.hireType === "import" && item.hireStatus === 'completed')
        const completedExportHires = this.props.hires.filter(item => item.hireType === "export" && item.hireStatus === 'completed')

        return (
            // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Tabs className="center">
                    <TabList>
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <TabPanel className="fadeIn animated slow">
                        <CompletedImports completedImportHires={completedImportHires} history={this.props.history}></CompletedImports>
                    </TabPanel>
                    <TabPanel className="fadeIn animated slow">
                        <CompletedExports completedExportHires={completedExportHires} history={this.props.history}></CompletedExports>
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
)(CompletedHires)
