import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import AddExport from './AddExport'
import AddImport from './AddImport'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

// Component that joins import and export hire addition 
class AddHire extends Component {
    
    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/><br/><br/>
                <Tabs className="container center">
                    <TabList>
                        <Tab>IMPORT</Tab>
                        <Tab>EXPORT</Tab>
                    </TabList>
                    <TabPanel>
                        <AddImport></AddImport>
                    </TabPanel>
                    <TabPanel>
                        <AddExport></AddExport>
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
    }
}

export default connect(mapStateToProps)(AddHire);