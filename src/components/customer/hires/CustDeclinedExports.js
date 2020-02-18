import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of export declined hires with sorting and filtering
const DeclinedExports = ({declinedExportHires, history}) => {
    if (!declinedExportHires.length) return <div><br/><br/><h3>No Declined Exports</h3><br/></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Pickup Location", field: "containerPickupCity", headerFilter:"input"},
        { title: "Cargo Location", field: "cargoLocationCity", headerFilter:"input", width: 150},
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
                containerPickupCity: exp.containerPickupCity,
                cargoLocationCity: exp.cargoLocationCity,
                cargoType: exp.cargoType,
                loadingDatetime: moment(exp.loadingDatetime).format('MMM Do YYYY, h:mm:ss a'),
                hireStatus: exp.hireStatus === "declined" ? 1 : 2
            })
        }
    )}

    var rowClick = (e, row) => {
        let path = '/User/UserManageTools/' + row.getData().id;
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
        </div>
    )
}

export default DeclinedExports
