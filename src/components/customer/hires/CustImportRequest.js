import React from 'react'
// import {Badge} from 'react-bootstrap'
import moment from 'moment'
// import {Link} from 'react-router-dom'
import { ReactTabulator } from 'react-tabulator'

const ImportRequests = ({importHireRequests, history}) => {
    if (!importHireRequests.length) return <div><br/><br/><h3>No Import Requests</h3><br/></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input"},
        { title: "Destination", field: "destination", headerFilter:"input", width: 150},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
                min:1,
                max:2,
                color:["blue"],
            }}

    ];

    var data = []

    {importHireRequests && importHireRequests.map(imp =>{
            data.push({
                id: imp.id,
                containerType: imp.containerType,
                pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                cargoType: imp.cargoType,
                vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm:ss a'),
                destination: imp.destination,
                hireStatus: imp.hireStatus === "request" ? 1 : 2
            })
        }
    )}

    var rowClick = (e, row) => {
        let path = '/cust/custManageHires/' + row.getData().id;
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
            />
            {/* <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>Type</th>
                    <th>Pickup Date</th>
                    <th>Cargo Type</th>
                    <th>Vessel Arrival Date</th>
                    <th>Destination</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {importHireRequests && importHireRequests.map(imp =>{
                        return(
                            <tr key={imp.id}>
                                <td className="center-align">{imp.containerType}</td>
                                <td className="center-align">{moment(imp.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.cargoType}</td>
                                <td className="center-align">{moment(imp.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.destination}</td>
                                <td className="center-align">{imp.customerName}</td>
                                <td className="center-align"><Badge variant="primary" className="black-text">Request</Badge></td>
                                <td className="center-align">
                                    <Link to={'/admin/hirerequests/' + imp.id}><button type="button" data-toggle="modal" data-id="" className="edit-details btn btn-primary" >View</button></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </div>
    )
}




export default ImportRequests
