import React from 'react'
import { ReactTabulator } from 'react-tabulator'

const DisabledVehicles = ({vehicles, history}) => {
    if (!vehicles.length) return <div><br/><br/><h4>No Disabled Vehicles</h4></div>

    const columns = [
        { title: "Vehicle No", field: "vehicleNo", width: 150, headerFilter:"input" },
        { title: "Make", field: "make", align: "left", headerFilter:"input"},
        { title: "Model", field: "model", headerFilter:"input" },
        { title: "Trailer No", field: "trailerNo", headerFilter:"input"},
        { title: "Purchased Date", field: "purchasedDate", align: "center"},
        { title: "Engine No", field: "engineNo", align: "center"},
    ];

    var data = []

    // eslint-disable-next-line
    {vehicles && vehicles.map(vehicle =>{
        data.push({
            id: vehicle.id, 
            vehicleNo: vehicle.vehicleNo, 
            make: vehicle.make, 
            model: vehicle.model, 
            trailerNo: vehicle.trailerNo, 
            purchasedDate: vehicle.purchasedDate, 
            engineNo: vehicle.engineNo})
    }       
    )} 

    var rowClick = (e, row) => {
        let path = '/admin/vehicles/' + row.getData().id;
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
                    <th className="center-align">Vehicle No</th>
                    <th className="center-align">Make</th>
                    <th className="center-align">Model</th>
                    <th className="center-align">Trailer No</th>
                    <th className="center-align">Purchased Date</th>
                    <th className="center-align">Engine Number</th>
                    <th className="center-align">Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles && vehicles.map(vehicle =>{
                    return(
                        <tr key={vehicle.id}>
                            <td className="center-align">{vehicle.vehicleNo}</td>
                            <td className="center-align">{vehicle.make}</td>
                            <td className="center-align">{vehicle.model}</td>
                            <td className="center-align">{vehicle.trailerNo}</td>
                            <td className="center-align">{vehicle.purchasedDate}</td>
                            <td className="center-align">{vehicle.engineNo}</td>
                            <td className="center-align">
                                <Link to={'/admin/vehicles/' + vehicle.id}><button type="button" data-toggle="modal" data-id="" className="edit-details btn btn-primary" data-target="#edit">View</button></Link>
                            </td>
                        </tr> 
                    )
                })}
                </tbody>
            </table> */}
        </div>
    )
}




export default DisabledVehicles