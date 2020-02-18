import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ExportRequests from './ExportRequests'
import ImportRequests from './ImportRequests'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


// Filter import and export hire requests and displays them in a tab view with sorting and filtering
class HireRequests extends Component {
    static defaultProps = {
        hires: []       
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        // Filter hires based on hire type and status
        // Filtered results are passed to respective displaying components 
        const importHireRequests = this.props.hires.filter(item => item.hireType === "import" && item.hireStatus === "request")
        const exportHireRequests = this.props.hires.filter(item => item.hireType === "export" && item.hireStatus === "request")
        
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
                        <ImportRequests importHireRequests={importHireRequests} history={this.props.history}></ImportRequests>
                    </TabPanel>
                    <TabPanel>
                        <ExportRequests exportHireRequests={exportHireRequests} history={this.props.history}></ExportRequests>
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
)(HireRequests)