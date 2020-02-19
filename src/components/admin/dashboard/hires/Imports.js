import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'


// List of imports completed with sorting and filtering
// Imports are passed from hires component
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

    // eslint-disable-next-line
    {importHires && importHires.filter(item => item.hireStatus !== 'declined').map(imp =>{
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
        </div>
    )
}




export default Imports