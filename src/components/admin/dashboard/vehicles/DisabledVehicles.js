import React from 'react'
import { ReactTabulator } from 'react-tabulator'

// Lists all the vehicles which are disabled from the system 
// React tabulator is used to filter and sort data
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
        </div>
    )
}




export default DisabledVehicles