import React, {Component} from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer"
import NewWindow from 'react-new-window'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Link} from "react-router-dom";
import Particles from 'react-particles-js';
import 'react-activity/dist/react-activity.css';
import Card from "react-bootstrap/Card";
import {Spinner} from "react-activity";

class ManageCompletedHire extends Component {

    static defaultProps = { // <-- DEFAULT PROPS
        customer: []
    }

    state = {
        loading: 1
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.customer && this.props.driver){
            this.setState({
                ...nextProps,
                loading: 0,
            });
        }

    }

    render() {

        const styles = StyleSheet.create({
            body: {
                padding: 10
            },
            table: {
                display: "table",
                width: "auto",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderWidth: 1,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderTopWidth: 0
            },
            tableRow: {
                // margin: "auto",
                flexDirection: "row"
            },
            tableColHeader: {
                width: "20%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderBottomColor: '#000',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol1Header: {
                width: "30%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderBottomColor: '#000',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol2Header: {
                width: "20%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderBottomColor: '#000',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol3Header: {
                width: "15%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderBottomColor: '#000',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol: {
                width: "20%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol1: {
                width: "30%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol2: {
                width: "20%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCol3: {
                width: "15%",
                borderStyle: "solid",
                borderColor: '#bfbfbf',
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCellHeader: {
                margin: "auto",
                margin: 5,
                fontSize: 12,
                fontWeight: 500,
                color: "blue"
            },
            tableCell: {
                margin: "auto",
                margin: 5,
                fontSize: 10
            },
            heading: {
                textAlign: "center",
                paddingTop: "20px",

            },
            subHeading:{
                textAlign: "left",
                paddingVertical: "30px",
                fontSize: "14",
                fontWeight: "bold",
            },
            heading2:{
                textAlign: "center",
                paddingTop: "4px",
                paddingBottom: "40px"
            }
        });

        const MyDocument = this.props.hire[0].hireType === "import" && this.state.loading === 0 ? (
            <Document>
                <Page style={styles.body}>
                    <View>
                        <Text style={styles.heading}>Trans Global Logistics</Text>
                    </View>
                    <View>
                        <Text style={styles.heading2}>Import Report</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Date</Text>
                            </View>
                            {/*<View style={styles.tableColHeader}>*/}
                            {/*    <Text style={styles.tableCellHeader}>Customer</Text>*/}
                            {/*</View>*/}
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Driver</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vehicle</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Trailer</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].completedDatetime.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            {/*<View style={styles.tableCol}>*/}
                            {/*    <Text style={styles.tableCell}>{this.state.customer[0].firstName + ' ' + this.state.customer[0].lastName}</Text>*/}
                            {/*</View>*/}
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].firstName + ' ' + this.state.driver[0].lastName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].vehicleNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].trailerNo}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Container Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Container Type</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Pickup Date</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Container Location</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerType + "ft"}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerPickupAddressLine1 + ',' + this.props.hire[0].containerPickupAddressLine2 + ',' + this.props.hire[0].containerPickupCity}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Cargo Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Cargo Type</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Net Weight</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].cargoType}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].netWeight}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Unloading Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol3Header}>
                                <Text style={styles.tableCellHeader}>Unloading Port</Text>
                            </View>
                            <View style={styles.tableCol3Header}>
                                <Text style={styles.tableCellHeader}>Terminal</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vessel</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vessel Arrival Date</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Destination</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableCell}>{this.props.hire[0].unloadingPort}</Text>
                            </View>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableCell}>{this.props.hire[0].unloadingTerminal}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].vessel}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{this.props.hire[0].destinationAddressLine1 + ',' + this.props.hire[0].destinationAddressLine2 + ',' + this.props.hire[0].destinationCity}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.subHeading}>Customer Details</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.table}>*/}
                    {/*    <View style={styles.tableRow}>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Customer Name</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Mobile No</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Email</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>NIC</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={styles.tableRow}>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].firstName + ' ' + this.state.customer[0].lastName}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].mobile}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].email}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].nic}</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View>
                        <Text style={styles.subHeading}>Driver Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Driver Name</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Mobile No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>License No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vehicle No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Trailer No</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].firstName + ' ' + this.state.driver[0].lastName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].mobile}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].licenseNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].vehicleNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].trailerNo}</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>

        ) : this.props.hire[0].hireType === "export" && this.state.loading === 0 ? (
            <Document>
                <Page style={styles.body}>
                    <View>
                        <Text style={styles.heading}>Trans Global Logistics</Text>
                    </View>
                    <View>
                        <Text style={styles.heading2}>Export Report</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Date</Text>
                            </View>
                            {/*<View style={styles.tableColHeader}>*/}
                            {/*    <Text style={styles.tableCellHeader}>Customer</Text>*/}
                            {/*</View>*/}
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Driver</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vehicle</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Trailer</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].completedDatetime.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            {/*<View style={styles.tableCol}>*/}
                            {/*    <Text style={styles.tableCell}>{this.state.customer[0].firstName + ' ' + this.state.customer[0].lastName}</Text>*/}
                            {/*</View>*/}
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].firstName + ' ' + this.state.driver[0].lastName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].vehicleNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].trailerNo}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Container Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Container Type</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Pickup Location</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerType + "ft"}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerPickupAddressLine1 + ',' + this.props.hire[0].containerPickupAddressLine2 + ',' + this.props.hire[0].containerPickupCity}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Cargo Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Cargo Type</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Cargo Weight</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Pickup Date</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Location</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].cargoType}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].netWeight}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{this.props.hire[0].cargoLocationAddressLine1 + ',' + this.props.hire[0].cargoLocationAddressLine2 + ',' + this.props.hire[0].cargoLocationCity}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Loading Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Loading Port</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Loading Terminal</Text>
                            </View>
                            <View style={styles.tableCol1Header}>
                                <Text style={styles.tableCellHeader}>Loading Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vessel</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].loadingPort}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].loadingTerminal}</Text>
                            </View>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].loadingDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].vessel}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.subHeading}>Customer Details</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.table}>*/}
                    {/*    <View style={styles.tableRow}>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Customer Name</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Mobile No</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>Email</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableColHeader}>*/}
                    {/*            <Text style={styles.tableCellHeader}>NIC</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={styles.tableRow}>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].firstName + ' ' + this.state.customer[0].lastName}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].mobile}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].email}</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.tableCol}>*/}
                    {/*            <Text style={styles.tableCell}>{this.state.customer[0].nic}</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View>
                        <Text style={styles.subHeading}>Driver Details</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Driver Name</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Mobile No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>License No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Vehicle No</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Trailer No</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].firstName + ' ' + this.state.driver[0].lastName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].mobile}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.driver[0].licenseNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].vehicleNo}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.state.vehicle[0].trailerNo}</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        ) : null


        return (
            this.state.loading === 1 ? (
                    <div className="text-center" style={{paddingTop:"500px"}}><Spinner color="#007bff" size={32} speed={1} animating={true} /></div>
                ) :
                <div className="completehire">
                    <br/><br/><br/><br/>
                    <Card border="primary" className="text-center">
                        <Card.Header color="blue"><h4>Hire Status</h4></Card.Header>
                        <Card.Body>
                            <br/><br/>
                    {this.props.hire[0].hireType === "import" ?
                        <div style={{margin: 'auto'}}>
                            <div id="progress-bar">
                                <div className="bar"></div>

                                <div className="circle-holder">
                                    <div className="circle done">
                                        <i className="fas fa-shipping-fast"></i>
                                        <span className="status">Truck Dispatched</span>
                                    </div>

                                    <div className="circle">
                                        <i className="fas fa-warehouse"></i>
                                        <span className="status">At Pickup location</span>
                                    </div>
                                    <div className="circle">
                                        <i className="fas fa-truck-loading"></i>
                                        <span className="status">Cargo loaded</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon"
                                           className=" ml-19 fas fa-truck-moving"></i>
                                        <span id="result-text"
                                              className="status ml-0">In Transit</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className="fas fa-map-marker-alt"></i>
                                        <span id="result-text"
                                              className="status ml-0">Destination Reached</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className=" ml-19 fas fa-ship"></i>
                                        <span id="result-text"
                                              className="status ml-0">Hire Completed</span>
                                    </div>
                                </div>
                            </div>
                            <br/><br/><br/><br/>
                            {/*<div*/}
                            {/*    style={{marginLeft:'auto',marginRight:'auto', marginTop:'100px', width: '600px', textAlign: 'center'}}*/}
                            {/*>*/}
                            {/*    <div>*/}
                            {/*        <input type="radio" name="shipment" value="0"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Kabul</label>*/}

                            {/*        <input type="radio" name="shipment" value="1"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Sevk</label>*/}

                            {/*        <input type="radio" name="shipment" value="2"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Dağıtım</label>*/}

                            {/*        <input type="radio" name="shipment" value="3"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Ziyaret</label>*/}

                            {/*        <input type="radio" name="shipment" value="4"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Teslim</label>*/}

                            {/*        <input type="radio" name="shipment" value="5"/>*/}
                            {/*        <label htmlFor="shipmentChoice">İade</label>*/}

                            {/*        <input type="radio" name="shipment" value="6"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Hasar</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div> :
                        <div style={{margin: 'auto'}}>
                            <div id="progress-bar">
                                <div className="bar"></div>

                                <div className="circle-holder">
                                    <div className="circle done">
                                        <i className="fas fa-shipping-fast"></i>
                                        <span className="status">Truck Dispatched</span>
                                    </div>

                                    <div className="circle">
                                        <i className="fas fa-warehouse"></i>
                                        <span className="status">At Container Pickup location</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className=" ml-19 fas fa-truck-moving"></i>
                                        <span id="result-text"
                                              className="status ml-0">In Transit</span>
                                    </div>
                                    <div className="circle">
                                        <i className="fas fa-truck-loading"></i>
                                        <span className="status">Cargo loaded</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className=" ml-19 fas fa-truck-moving"></i>
                                        <span id="result-text"
                                              className="status ml-0">In Transit</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className="fas fa-map-marker-alt"></i>
                                        <span id="result-text"
                                              className="status ml-0">Loading Port Reached</span>
                                    </div>
                                    <div className="circle">
                                        <i id="result-icon" className=" ml-19 fas fa-ship"></i>
                                        <span id="result-text"
                                              className="status ml-0">Hire Completed</span>
                                    </div>
                                </div>
                            </div>
                            <br/><br/><br/><br/>
                            {/*<div*/}
                            {/*    style={{marginLeft:'auto',marginRight:'auto', marginTop:'100px', width: '600px', textAlign: 'center'}}*/}
                            {/*>*/}
                            {/*    <div>*/}
                            {/*        <input type="radio" name="shipment" value="0"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Kabul</label>*/}

                            {/*        <input type="radio" name="shipment" value="1"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Sevk</label>*/}

                            {/*        <input type="radio" name="shipment" value="2"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Dağıtım</label>*/}

                            {/*        <input type="radio" name="shipment" value="3"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Ziyaret</label>*/}

                            {/*        <input type="radio" name="shipment" value="4"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Teslim</label>*/}

                            {/*        <input type="radio" name="shipment" value="5"/>*/}
                            {/*        <label htmlFor="shipmentChoice">İade</label>*/}

                            {/*        <input type="radio" name="shipment" value="6"/>*/}
                            {/*        <label htmlFor="shipmentChoice">Hasar</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    }
                        </Card.Body>
                    </Card>
                    <div className="input-field center">

                        <Link to="/User/UserManageTools"><button className="btn orange lighten-1 z-depth-5 btn1">Back</button></Link>
                        <Particles />
                    </div>
                    <NewWindow>
                        <PDFViewer style={{width:"100%", height:"100%"}}>{MyDocument}</PDFViewer>
                    </NewWindow>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        // customer: state.firestore.ordered.customers,
        driver: state.firestore.ordered.drivers,
        vehicle: state.firestore.ordered.vehicles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        // {collection: 'customers',doc: props.hire[0].customerId,},
        { collection: 'drivers', doc: props.hire[0].driverId },
        { collection: 'vehicles', doc: props.hire[0].vehicleId }
    ])
)(ManageCompletedHire)
