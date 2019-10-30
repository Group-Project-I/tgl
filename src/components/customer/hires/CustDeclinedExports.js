import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

const DeclinedExports = ({declinedExportHires, history}) => {
    if (!declinedExportHires.length) return <div><br/><br/><h4>No Declined Exports</h4></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Pickup Location", field: "pickupLocation", headerFilter:"input"},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Loading Date", field: "loadingDatetime", headerFilter:"input"},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
                min:1,
                max:2,
                color:["red"],
            }}

    ];

    var data = []

    {declinedExportHires && declinedExportHires.map(exp =>{
            data.push({
                id: exp.id,
                containerType: exp.containerType,
                pickupDatetime: moment(exp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                pickupLocation: exp.pickupLocation,
                cargoType: exp.cargoType,
                loadingDatetime: moment(exp.loadingDatetime).format('MMM Do YYYY, h:mm:ss a'),
                hireStatus: exp.hireStatus === "declined" ? 1 : 2
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
                        <th>Loading Date</th>
                        <th>Driver</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {ongoingExportHires && ongoingExportHires.map(exp =>{
                            return (
                                <tr key={exp.id}>
                                <td className="center-align">{exp.containerType}</td>
                                <td className="center-align">{moment(exp.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{exp.cargoType}</td>
                                <td className="center-align">{moment(exp.loadingDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{exp.driverName}</td>
                                <td className="center-align">{exp.customerName}</td>
                                <td className="center-align">{exp.vehicleId}</td>
                                <td className="center-align"><Badge variant="warning" className="black-text">Ongoing</Badge></td>
                                <td className="center-align">
                                    <Link to={'/admin/hires/' + exp.id}><button type="button" data-toggle="modal" data-id="" className="edit-details btn btn-primary" >View</button></Link>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> */}
        </div>
    )
}

export default DeclinedExports