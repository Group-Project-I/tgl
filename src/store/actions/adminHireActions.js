import { auth } from "firebase";

// Add import hire from admin account
export const addImportHire = (importHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('hires').add({
            containerType: importHire.containerType,
            containerPickupAddressLine1: importHire.containerPickupAddressLine1,
            containerPickupAddressLine2: importHire.containerPickupAddressLine2,
            containerPickupCity: importHire.containerPickupCity,
            pickupDatetime: importHire.pickupDatetime,
            cargoType: importHire.cargoType,
            netWeight: importHire.netWeight,
            unloadingPort: importHire.unloadingPort,
            unloadingTerminal: importHire.unloadingTerminal,
            vessel: importHire.vessel,
            vesselArrivalDatetime: importHire.vesselArrivalDatetime,
            destinationAddressLine1: importHire.destinationAddressLine1,
            destinationAddressLine2: importHire.destinationAddressLine2,
            destinationCity: importHire.destinationCity,
            driverId: importHire.driverId,
            driverName: importHire.driverName,
            customerId: importHire.customerId,
            customerName: importHire.customerName,
            vehicleId: importHire.vehicleId,
            vehicleNo: importHire.vehicleNo,
            remarks: importHire.remarks,
            hireType: 'import',
            hireStatus: 'completed',
            createAt: new Date(),
            completedDatetime:new Date(2019,1,24,15,33,30),
            timeline: {
                truckDispatched: {
                    set:1,
                    val: 'truckDispatched',
                    id: 1,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/interstate-truck.png',
                    title: 'Truck Dispatched',
                    at:new Date(2019,1,24,10,33,30)

                },
                atCargoLocation: {
                    set:1,
                    val: 'atCargoLocation',
                    id: 2,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/cargo-ship.png',
                    title: 'At Cargo Location',
                    at:new Date(2019,1,24,11,33,30)

                },
                cargoLoaded: {
                    set:1,
                    val: 'cargoLoaded',
                    id: 3,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/container-truck.png',
                    title: 'Cargo Loaded',
                    at:new Date(2019,1,24,12,33,30)


                },
                inTransit: {
                    set:1,
                    val: 'inTransit',
                    id: 4,
                    bg: '#f6f6f6',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                    at:new Date(2019,1,24,13,33,30)

                },
                destinationReached: {
                    set:1,
                    val: 'destinationReached',
                    id: 5,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/fork-lift.png',
                    title: 'Destination Reached',
                    at:new Date(2019,1,24,14,33,30)

                },
                hireCompleted: {
                    set:1,
                    val: 'hireCompleted',
                    id: 6,
                    bg: 'green',
                    img: 'hhttps://img.icons8.com/color/48/000000/checked-truck.png',
                    title: 'Hire Completed',
                    at:new Date(2019,1,24,15,33,30)
                },
            }
        }).then(() => {
            dispatch({type: 'ADD_IMPORT', importHire});
        }).catch((err) => {
            dispatch({type: 'ADD_IMPORT_ERROR', err});
        })


    }
};

// Add export hire from admin account
export const addExportHire = (exportHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const state= getState()
        const auth= state.firebase.auth
        const firestore = getFirestore();
        firestore.collection('hires').add({
            containerType: exportHire.containerType,
            containerPickupAddressLine1: exportHire.containerPickupAddressLine1,
            containerPickupAddressLine2: exportHire.containerPickupAddressLine2,
            containerPickupCity: exportHire.containerPickupCity,
            pickupDatetime: exportHire.pickupDatetime,
            cargoLocationAddressLine1: exportHire.cargoLocationAddressLine1,
            cargoLocationAddressLine2: exportHire.cargoLocationAddressLine2,
            cargoLocationCity: exportHire.cargoLocationCity,
            cargoType: exportHire.cargoType,
            netWeight: exportHire.netWeight,
            loadingPort: exportHire.loadingPort,
            loadingTerminal: exportHire.loadingTerminal,
            vessel: exportHire.vessel,
            loadingDatetime: exportHire.loadingDatetime,
            driverId: exportHire.driverId,
            driverName: exportHire.driverName,
            customerId: exportHire.customerId,
            customerName: exportHire.customerName,
            vehicleId: exportHire.vehicleId,
            vehicleNo: exportHire.vehicleNo,
            remarks: exportHire.remarks,
            hireType: 'export',
            hireStatus: 'completed',
            createAt: new Date(),
            completedDatetime:new Date(2019,1,24,15,33,30),

            timeline: {
                truckDispatched: {
                    set:1,
                    val: 'truckDispatched',
                    id: 1,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/interstate-truck.png',
                    title: 'Truck Dispatched',
                    at:new Date(2019,1,24,9,33,30)

                },
                atContainerLocation: {
                    set:1,
                    val: 'atContainerLocation',
                    id: 2,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/shipping-container.png',
                    title: 'At Container Location',
                    at:new Date(2019,1,24,10,33,30)

                },
                inTransit: {
                    set:1,
                    val: 'inTransit',
                    id: 3,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                    at:new Date(2019,1,24,11,33,30)

                },
                cargoLoaded: {
                    set:1,
                    val: 'cargoLoaded',
                    id: 4,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/container-truck.png',
                    title: 'Cargo Loaded',
                    at:new Date(2019,1,24,12,33,30)

                },
                inTransit2: {
                    set:1,
                    val: 'inTransit2',
                    id: 5,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                    at:new Date(2019,1,24,13,33,30)

                },
                portReached: {
                    set:1,
                    val:'portReached',
                    id: 6,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/cargo-ship.png',
                    title: 'Port Reached',
                    at:new Date(2019,1,24,14,33,30)

                },
                hireCompleted: {
                    set:1,
                    val: 'hireCompleted',
                    id: 7,
                    bg: 'green',
                    img: 'https://img.icons8.com/color/48/000000/checked-truck.png',
                    title: 'Hire Completed',
                    at:new Date(2019,1,24,15,33,30)

                },
            }
        }).then(() => {
            dispatch({type: 'ADD_EXPORT', exportHire});
        }).catch((err) => {
            dispatch({type: 'ADD_EXPORT_ERROR', err});
        })

       
    }
};

// Hire request is accepted by the administrator by assigning a driver 
// Hire status is changed from request to driverPending 
export const acceptHireRequest = (id, hireRequest) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const cust=firestore.collection('hires').doc(id).customerId
        
        firestore.collection('hires').doc(id).update({
            driverName: hireRequest.driverName,
            driverId: hireRequest.driverId,
            vehicleId: hireRequest.vehicleId,
            vehicleNo: hireRequest.vehicleNo,
            hireStatus: 'driverPending',
            remarks: hireRequest.remarks
        }).then(() => {
            dispatch({type: 'HIRE_REQUEST_UPDATED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_UPDATING_HIRE_REQUEST', err})
        })
        firestore.collection('notifications').add({
            to:cust,
            from:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            type:'hire accepted',
            data:"Hire Accepted",
            link:'/User/UserManageTools',
            createdAt:new Date()}).then(() => {
                console.log("doc added")
                dispatch({type: 'Notication_Added'});
            }).catch((err) => {
                dispatch({type: 'Notificaton_Add_ERROR', err});
            })

    }
}

// Hire stauts is changed to declined when admin declines a hire request
export const declineHireRequest = (id, hireRequest) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const cust=firestore.collection('hires').doc(id).customerId
        firestore.collection('hires').doc(id).update({
            hireStatus: 'declined',
            driverName: '',
            driverId: '',
            vehicleId: '',
            vehicleNo: '',
            remarks: hireRequest.remarks
        }).then(() => {
            dispatch({type: 'HIRE_REQUEST_DECLINED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_DECLINING_HIRE_REQUEST', err})
        })
        firestore.collection('notifications').add({
            to:'OrA27JIucfUxewmLheSRc7dMx5s1',
            from:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            type:'hire declined',
            data:"Hire Declined",
            link:'/User/UserManageTools',
            createdAt:new Date()}).then(() => {
                console.log("doc added")
                dispatch({type: "Notication_Added"});
            }).catch((err) => {
                dispatch({type: 'Notificaton_Add_ERROR', err});
            })
    }
}


// When the hire is completed the hire status is updated to completed by the administrator 
// Notification is sent to the customer once a hire is completed
export const completeHire = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('hires').doc(id).update({
            hireStatus: 'completed',
            completedDatetime: new Date()
        }).then(() => {
            dispatch({type: 'HIRE_COMPLETION_RECORDED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_RECORDING_HIRE_COMPLETION', err})
        })
        firestore.collection('notifications').add({
            to:'OrA27JIucfUxewmLheSRc7dMx5s1',
            from:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            type:'hire completed',
            data:"Hire Completed",
            link:'/User/UserManageTools',
            createdAt:new Date()}).then(() => {
                console.log("doc added")
                dispatch({type: "Notication_Added"});
            }).catch((err) => {
                dispatch({type: 'Notificaton_Add_ERROR', err});
            })
    }
}

