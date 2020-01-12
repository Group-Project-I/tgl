import React from 'react'
import {Badge} from 'react-bootstrap'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

const Imports = ({importHires, history}) => {
    if (!importHires.length) return <div><br/><br/><h4>No Imports Available</h4></div>
    global.moment = require("moment");

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Destination", field: "destination", headerFilter:"input", width: 150},
        { title: "Driver", field: "driverName", headerFilter:"input"},
        { title: "Customer", field: "customerName", headerFilter:"input"},
        { title: "Vehicle", field: "vehicleNo", headerFilter:"input", width: 150},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
            min:1,
            max:2,
            color:["green", "red"],
        }}
    ];

    var data = []

    {importHires && importHires.map(imp =>{
        data.push({
            id: imp.id, 
            containerType: imp.containerType, 
            pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm a'), 
            cargoType: imp.cargoType, 
            vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm a'), 
            destination: imp.destinationCity, 
            driverName: imp.driverName,
            customerName: imp.customerName,
            vehicleNo: imp.vehicleNo,
            hireStatus: imp.hireStatus === "completed" ? 1 : 2

        })
    }       
    )} 

    var rowClick = (e, row) => {
        let path = '/admin/hires/' + row.getData().id;
        history.push(path)
    };
    return(
        <div>
            <br/><br/>
            <ReactTabulator
                data={data}
                columns={columns}
                tooltips={true}
                layout={"fitData"}
                rowClick={rowClick}
                options={{ pagination: 'local',paginationSize: 10}}
                initialSort={[
                    {column: "pickupDatetime", dir:"desc"}
                ]}
            />
            {/* <table className="table">
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
                                <td className="center-align">{moment(imp.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.cargoType}</td>
                                <td className="center-align">{moment(imp.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.destination}</td>
                                <td className="center-align">{imp.driverName}</td>
                                <td className="center-align">{imp.customerName}</td>
                                <td className="center-align">{imp.vehicleNo}</td>
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
            </table> */}
        </div>
    )
}




export default Imports