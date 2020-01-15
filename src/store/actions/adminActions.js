import firebase from 'firebase/app';
import 'firebase/firestore';

export const addVehicle = (vehicle) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('vehicles').add({
            ...vehicle,
            disabled: false,
            createAt: new Date()
        }).then(() => {
            dispatch({type: 'ADD_VEHICLE', vehicle});
        }).catch((err) => {
            dispatch({type: 'ADD_VEHICLE_ERROR', err});
        })
    }
};

export const addCustomer = (newCustomer) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        var config = {apiKey: "AIzaSyB0_LTBs3_DdQN17AVfkWKP82oL-2WwXFw",
        authDomain: "trans-global-logistics-969a7.firebaseapp.com",
        databaseURL: "https://trans-global-logistics-969a7.firebaseio.com"};

        var secondaryApp = firebase.initializeApp(config, "Secondary");

        secondaryApp.auth().createUserWithEmailAndPassword(
            newCustomer.email,
            newCustomer.password
        ).then((resp) => {
            var docRef = firestore.collection('users').doc(resp.user.uid)
            secondaryApp.auth().signOut();
            return docRef.set({
                userType: 'customer'
            }).then(() => {
                return firestore.collection('customers').doc(docRef.id).set({
                    firstName: newCustomer.firstName,
                    lastName: newCustomer.lastName,
                    email: newCustomer.email,
                    mobile: newCustomer.mobile,
                    dob: newCustomer.dob,
                    nic: newCustomer.nic,
                    disabled: false,
                    createdAt: new Date()
                })
            })
        }).then(() => {
            dispatch({type: 'CUSTOMER_ADDED'})
            
        }).catch(err => {
            dispatch({type: 'FAILED_TO_ADD_CUSTOMER', err})
        })
    }
}

export const addDriver = (newDriver) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        var config = {apiKey: "AIzaSyB0_LTBs3_DdQN17AVfkWKP82oL-2WwXFw",
        authDomain: "trans-global-logistics-969a7.firebaseapp.com",
        databaseURL: "https://trans-global-logistics-969a7.firebaseio.com"};

        var secondaryApp = firebase.initializeApp(config, "Secondary");

        secondaryApp.auth().createUserWithEmailAndPassword(
            newDriver.email,
            newDriver.password
        ).then((resp) => {
            var docRef = firestore.collection('users').doc(resp.user.uid)
            secondaryApp.auth().signOut();
            return docRef.set({
                userType: 'driver'
            }).then(() => {
                return firestore.collection('drivers').doc(docRef.id).set({
                    firstName: newDriver.firstName,
                    lastName: newDriver.lastName,
                    email: newDriver.email,
                    mobile: newDriver.mobile,
                    licenseNo: newDriver.licenseNo,
                    nic: newDriver.nic,
                    dob: newDriver.dob,
                    onHire: '0',
                    disabled: false,
                    createdAt: new Date()
                })
            })
        }).then(() => {
            dispatch({type: 'DRIVER_ADDED'})
            
        }).catch(err => {
            dispatch({type: 'FAILED_TO_ADD_DRIVER', err})
        })
    }
}

export const editUser = (customerId, data, collec) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        if(collec === 'customers'){
            var oldName = firestore.collection('customers').doc(customerId).get().then((doc) => {
                return firestore.collection(collec).doc(customerId).update({
                    ...data
                }).then(() => {
                    let data = {
                        to: 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
                        from: customerId,
                        data: doc.data().firstName + ' ' + doc.data().lastName + ' updated user information',
                        link: '/admin/customers/' + customerId,
                        type: 'details updated',
                        createdAt: new Date()
                    }
                    if(collec === 'customers'){
                        return firestore.collection('notifications').add(data)
                    }    
                })
            })
        }else{
            firestore.collection(collec).doc(customerId).update({
                ...data
            }).then(() => {
                dispatch({type: 'DOCUMENT_UPDATED'});
            }).catch((err) => {
                dispatch({type: 'ERROR_UPDATING_DOCUMENT', err});
            })
        }
        
    }
}

export const disableOrEnableUser = (userId, collec, token) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection(collec).doc(userId).update({
            disabled: token
        }).then(() => {
            return firestore.collection('users').doc(userId).update({
                disabled: token
            })
        }).then(() => {
            dispatch({type: 'AVAILABILITY_UPDATED'})
        }).catch(err => {
            dispatch({type: 'FAILED_TO_UPDATE_AVAILABILITY', err})
        })
    }
}

export const disableOrEnableVehicle = (id, token) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('vehicles').doc(id).update({
            disabled: token
        }).then(() => {
            dispatch({type: 'AVAILABILITY_UPDATED'})
        }).catch(err => {
            dispatch({type: 'FAILED_TO_UPDATE_AVAILABILITY', err})
        })
    }
}

export const readNotification = (id) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('notifications').doc(id).delete().then(() => {
            dispatch({type: 'NOTIFICATION READ AND DELETED'})
        }).catch(err => {
            dispatch({type: 'FAILED TO DELETE NOTIFICATION', err})
        })
    }
}

export const addCity = (details) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        let data = {
            id: details.id,
            import20ft: details.import20ft,
            import40ft: details.import40ft,
            export20ft: details.export20ft,
            export40ft: details.export40ft
        }
        firestore.collection('pricing').doc(details.id).set(data).then(() => {
            dispatch({type: 'CITY_ADDED_SUCCESSFULLY'})
        }).catch(err => {
            dispatch({type: 'FAILED_TO_ADD_CITY', err})
        })
    }
}

export const editCity = (details) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('pricing').doc(details.id).update({
            ...details
        }).then(() => {
            dispatch({type: 'PRICING_UPDATED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_UPDATING_PRICING', err});
        })
    }
}

export const sendMessage = (message, senderId, receiverId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('chats').doc(receiverId).update({
            read: receiverId,
            messages: firebase.firestore.FieldValue.arrayUnion({
                message: message,
                sender: senderId,
                time: new Date()
            })
        })
    }
}

export const readMessage = (messageId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('chats').doc(messageId).update({
            read: ""
        })
    }
}

