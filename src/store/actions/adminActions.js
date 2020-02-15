 import firebase from 'firebase/app';
import 'firebase/firestore';

// Register vehicle to the firestore database
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

// Register customer to the system
// A secondary auth account will be created when the administrator is adding a customer
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
            dispatch({type:'FAILED_TO_ADD_CUSTOMER', err})
        })
    }
}

// Register driver to the system 
// A secondary account is created to add drivers to firebase authentication system 
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


// Edit User details 
// Collection name is passed as a parameter to reuse the function with customers, drivers and vehicles 
// Notification is created when customer details are edited 
export const editUser = (customerId, data, collec) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        if(collec === 'customers'){
            firestore.collection('customers').doc(customerId).get().then((doc) => {
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

// Admin can disable customers or drivers from the system
// diabled field is used to make users enable or disable 
// No user details are deleted 
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

// Admin can disable vehicleds from the database
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

// Notifications are deleted from the system once read
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

// Add city to the pricing component
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

// Edit city details in pricing component
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


// Delete city from pricing component
export const deleteCity = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('pricing').doc(id).delete().then(() => {
            dispatch({type: 'PRICING_DELETED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_DELETING_PRICING', err});
        })
    }
}

// Send message from admin to customer 
export const sendMessage = (message, senderId, receiverId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('chats').doc(receiverId).update({
            read: receiverId,
            finalTime: new Date(),
            messages: firebase.firestore.FieldValue.arrayUnion({
                message: message,
                sender: senderId,
                time: new Date()
            })
        })
    }
}

// Read status is updated once the message is read by the administrator 
export const readMessage = (messageId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('chats').doc(messageId).update({
            read: ""
        })
    }
}

