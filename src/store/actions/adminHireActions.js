// import { FirebaseStorage } from "@firebase/storage-types";
import { auth } from "firebase";

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
            hireStatus: 'driverPending',
            createAt: new Date()
        }).then(() => {
            dispatch({type: 'ADD_IMPORT', importHire});
        }).catch((err) => {
            dispatch({type: 'ADD_IMPORT_ERROR', err});
        })


    }
};

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
            hireStatus: 'driverPending',
            createAt: new Date()
        }).then(() => {
            dispatch({type: 'ADD_EXPORT', exportHire});
        }).catch((err) => {
            dispatch({type: 'ADD_EXPORT_ERROR', err});
        })

       
    }
};

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
            to:'OrA27JIucfUxewmLheSRc7dMx5s1',
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

export const completeHire = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        // const cust=firestore.collection('hires').doc(id).customerId
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

