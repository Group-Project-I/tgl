import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'
import Button from "reactstrap/es/Button";

const CompletedImports = ({completedImportHires, history}) => {
    if (!completedImportHires.length) return <div><br/><br/><h3>No Completed Imports</h3><br/></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input"},
        { title: "Destination", field: "destination", headerFilter:"input", width: 150},
        { title: "Driver", field: "driverName", headerFilter:"input"},

        { title: "Vehicle", field: "vehicleNo", headerFilter:"input", width: 150},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{

                color:["green"],
            }},


    ];


    var data = []

    {completedImportHires && completedImportHires.map(imp =>{
            data.push({
                id: imp.id,
                containerType: imp.containerType,
                pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                cargoType: imp.cargoType,
                vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm:ss a'),
                destination: imp.destination,
                driverName: imp.driverName,

                vehicleNo: imp.vehicleNo,
                hireStatus: imp.hireStatus === "completed" ? 1 : 2,

            })
        }
    )}

    var rowClick = (e, row) => {
        let path = '/User/UserManageTools/' + row.getData().id;
        history.push(path);
        // console.log(history)
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
                initialSort={[
                    {column: "pickupDatetime", dir:"desc"}
                ]}
            />
        </div>
    )
}




export default CompletedImports
