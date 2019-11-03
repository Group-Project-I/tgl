import React, {Component} from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer"
import NewWindow from 'react-new-window'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'

class ManageCompletedHires extends Component {

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
                paddingBottom: "40px"
            },
            subHeading:{
                textAlign: "left",
                paddingVertical: "30px",
                fontSize: "12"
            }
        });

        const MyDocument = this.props.hire[0].hireType === "import" && this.state.loading === 0 ? (
            <Document>
                <Page style={styles.body}>
                    <View>
                        <Text style={styles.heading}>Trans Global Logistics - Import</Text>
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
                        <Text style={styles.subHeading}>--- Container Details ---</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Container Type</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Pickup Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Container Location</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerType + "ft"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].pickupLocation}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>--- Cargo Details ---</Text>
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
                                <Text style={styles.tableCellHeader}>Vessel Arrival Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Unloading Port</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Destination</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].cargoType}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].weight}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].unloadingPort}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].destination}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.subHeading}>--- Customer Details ---</Text>*/}
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
                        <Text style={styles.subHeading}>--- Driver Details ---</Text>
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
                        <Text style={styles.heading}>Trans Global Logistics - Export</Text>
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
                        <Text style={styles.subHeading}>--- Container Details ---</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Container Type</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Pickup Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Pickup Location</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].containerType + "ft"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].pickupLocation}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>--- Cargo Details ---</Text>
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
                                <Text style={styles.tableCellHeader}>Loading Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Loading Port</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].cargoType}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].weight}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moment(this.props.hire[0].loadingDatetime).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{this.props.hire[0].loadingPort}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.subHeading}>--- Customer Details ---</Text>*/}
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
                        <Text style={styles.subHeading}>--- Driver Details ---</Text>
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
                    <div><br/><br/><br/><br/><h1>Loading</h1></div>
                ) :
                <NewWindow>
                    <PDFViewer style={{width:"100%", height:"100%"}}>{MyDocument}</PDFViewer>
                </NewWindow>
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
)(ManageCompletedHires)
