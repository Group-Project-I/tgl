import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

const DeclinedImports = ({declinedImportHires, history}) => {
    if (!declinedImportHires.length) return <div><br/><br/><h3>No Declined Imports</h3><br/></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input"},
        { title: "Destination", field: "destination", headerFilter:"input", width: 150},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
                color:["red"],
            }}
    ];

    var data = []

    {declinedImportHires && declinedImportHires.map(imp =>{
            data.push({
                id: imp.id,
                containerType: imp.containerType,
                pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                cargoType: imp.cargoType,
                vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm:ss a'),
                destination: imp.destination,
                hireStatus: imp.hireStatus === "declined" ? 1 : 2
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
                options={{ pagination: 'local',paginationSize: 5}}
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
                    {ongoingImportHires && ongoingImportHires.map(imp =>{
                        return(
                            <tr key={imp.id}>
                                <td className="center-align">{imp.containerType}</td>
                                <td className="center-align">{moment(imp.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.cargoType}</td>
                                <td className="center-align">{moment(imp.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td className="center-align">{imp.destination}</td>
                                <td className="center-align">{imp.driverName}</td>
                                <td className="center-align">{imp.customerName}</td>
                                <td className="center-align">{imp.vehicleId}</td>
                                <td className="center-align"><Badge variant="warning" className="black-text">Ongoing</Badge></td>
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




export default DeclinedImports
