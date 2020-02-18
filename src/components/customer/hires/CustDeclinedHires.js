import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import DeclinedExports from './CustDeclinedExports'
import DeclinedImports from './CustDeclinedImports'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect, withRouter} from 'react-router-dom'

// Filter import and export declined hires and displays them in a tab view with sorting and filtering
class DeclinedHire extends Component {
    static defaultProps = { // <-- DEFAULT PROPS
        hires: []
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const declinedImportHires = this.props.hires.filter(item => item.hireType === "import" && item.hireStatus === 'declined' && item.customerId === auth.uid )
        const declinedExportHires = this.props.hires.filter(item => item.hireType === "export" && item.hireStatus === 'declined' && item.customerId === auth.uid)

        return (
            // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Tabs className="center">
                    <TabList className="fadeInDown animated fast ">
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <TabPanel>
                        <DeclinedImports declinedImportHires={declinedImportHires} history={this.props.history}></DeclinedImports>
                    </TabPanel>
                    <TabPanel>
                        <DeclinedExports declinedExportHires={declinedExportHires} history={this.props.history}></DeclinedExports>
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
)(withRouter(DeclinedHire))
