import React, {Component} from 'react'
import ReactToPrint from 'react-to-print'
import moment from 'moment'
import {MdPrint} from "react-icons/md";

class Report extends Component {

    componentWillReceiveProps(nextProps) {    
        if(this.props.hires){
            this.setState({
                ...nextProps,
                loading: 0,
            });
        } 
    }

    render(){
        return(
            <div>
                {this.props.hires ? 
                <div>
                    <ReactToPrint 
                        trigger={() => <a href="#"><MdPrint size={28}/></a>}
                        content={() => this.componentRef}
                    />
                    <table className="table" ref={el => (this.componentRef = el)} style={{paddingTop:'20px'}}>
                        <thead className="thead-dark">
                        <tr>
                            <th className="center-align">Type</th>
                            <th className="center-align">Container</th>
                            <th className="center-align">Pickup Date</th>
                            <th className="center-align">Cargo Type</th>
                            <th className="center-align">Cargo Location</th>
                            <th className="center-align">Destination</th>
                            <th className="center-align">Customer</th>
                            <th className="center-align">Driver</th>
                            <th className="center-align">Vehicle</th>
                            <th className="center-align">Completed Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.hires && this.props.hires.map(hire =>{
                                return(
                                    <tr key={hire.id}>
                                        <td className="center-align">{hire.hireType}</td>
                                        <td className="center-align">{hire.containerType}</td>
                                        <td className="center-align">{moment(hire.pickupDatetime).format('MMMM Do YYYY, h:mm a')}</td>
                                        <td className="center-align">{hire.cargoType}</td>
                                        <td className="center-align">{hire.hireType === "export" ? hire.cargoLocationCity : "N/A"}</td>
                                        <td className="center-align">{hire.hireType === "import" ? hire.destinationCity : "N/A"}</td>
                                        <td className="center-align">{hire.customerName}</td>
                                        <td className="center-align">{hire.driverName}</td>
                                        <td className="center-align">{hire.vehicleNo}</td>
                                        <td className="center-align">{moment(hire.completedDatetime.toDate()).format('MMMM Do YYYY, h:mm a')}</td>
                                    </tr> 
                                )
                            })}
                        </tbody>
                    </table> 
                </div> : null

                }   
            </div>
        )
    }
}

export default Report