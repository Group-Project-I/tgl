import React, {Component} from 'react'
import "react-tabs/style/react-tabs.css";
import {connect} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import CompletedHires from './CustCompletedHires'
import HireRequest from './CustHireRequest'
import DeclinedHire from './CustDeclinedHires';
import OngoingHire from './CustOngoingHire';


class ManageTools extends Component {

    static defaultProps = { // <-- DEFAULT PROPS
        hire: []
    }

    state = {
        load: 1
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.hire){
            this.setState({
                // ...nextProps.hire[0],
                load: 0,
            });
        }

    }

    render() {
        const {auth, id, hire} = this.props
        // if (!auth.uid) return <Redirect to='/signin' />


        return (
            <div className="image1">


                <div id="content" className="fluid " role="main">
                    <br/><br/><br/><br/><br/><br/><br/><br/>


                    <Tabs className="center">
                        <TabList className="tablist">
                            <Tab>COMPLETED</Tab>
                            <Tab>REQUESTED</Tab>
                            <Tab>ONGOING</Tab>
                            <Tab>DECLINED</Tab>
                        </TabList>

                        <br/><br/><br/><br/><br/><br/>

                        <TabPanel>
                            <div className="complete1">

                                <CompletedHires/>
                                <br/><br/>
                            </div>


                        </TabPanel>
                        <TabPanel>
                            <div className="complete1">
                                <HireRequest/>
                                <br/><br/>
                            </div>


                        </TabPanel>
                        <TabPanel>
                            <div className="complete1">
                                <OngoingHire/>
                                <br/><br/>
                            </div>

                        </TabPanel>
                        <TabPanel>
                            <div className="complete1">
                                <DeclinedHire/>
                                <br/><br/>

                            </div>
                        </TabPanel>
                    </Tabs>


                </div>


            </div>


        )
    }
}

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    return{
        auth: state.firebase.auth,
        id: id,
        hire: state.firestore.ordered.hires,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'hires',
        // doc: props.id,
    }])
)(ManageTools)