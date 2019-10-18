import React from 'react'
import {Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Imports = ({importHires}) => {
    return(
        <div>
            <br/><br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>Type</th>
                    <th>Pickup Date</th>
                    <th>Cargo Type</th>
                    <th>Vessel Arrival Date</th>
                    <th>Destination</th>
                    <th>Driver</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {importHires && importHires.map(imp =>{
                        return(
                            <tr key={imp.id}>
                                <td className="center-align">{imp.containerType}</td>
                                <td className="center-align">{imp.pickupDatetime.seconds}</td>
                                <td className="center-align">{imp.cargoType}</td>
                                <td className="center-align">{imp.vesselArrivalDatetime.seconds}</td>
                                <td className="center-align">{imp.destination}</td>
                                <td className="center-align">{imp.driverId}</td>
                                <td className="center-align">{imp.customerId}</td>
                                <td className="center-align">{imp.vehicleId}</td>
                                <td className="center-align">{imp.hireStatus === "completed" ? <Badge variant="success" className="black-text">Completed</Badge> : (
                                    imp.hireStatus === "request" ? <Badge variant="primary" className="black-text">Request</Badge> : (
                                        imp.hireStatus === "driverPending" ? <Badge variant="danger" className="black-text">Pending</Badge> : <Badge variant="warning" className="black-text">Ongoing</Badge>
                                    )
                                    )}
                                </td>
                                <td className="center-align">
                                    <Link to={'/admin/hires/' + imp.id}><button type="button" data-toggle="modal" data-id="" className="edit-details btn btn-primary" >View</button></Link>
                                </td>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}




export default Imports