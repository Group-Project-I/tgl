import firebase from 'firebase/app';
import 'firebase/firestore';
import { Alert } from 'react-bootstrap';
import profile from '../../components/customer/profile';
 
export const clean = () => ({
  type: 'CLEAN_UP',
});
// reset email

export const resetEmail =(newEmail,password) =>{
  return(dispatch ,getState)=>{
    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    user.reauthenticateWithCredential(credentials).then(() => {
      var user = firebase.auth().currentUser
      user.updateEmail(newEmail).then(()=> {
        // Update successful.
          dispatch ({type: 'RESET_EMAIL_SUCCESS'})
      }).catch((error)=> {
        // An error happened.
        dispatch ({type: 'RESET_EMAIL_FAILED',error})
      });
    }).catch((err) => {
      dispatch({type: 'FAILED_TO_REAUTHENTICATE', err})
  })
  }
}

/*action creator for  forget passsword*/
export const recoverPassword =(creds) => {
  return(dispatch ,getState,{getFirebase,getFirestore})=>{
    var firebase=getFirebase();
    var auth =firebase.auth();
    //test the function
    // var email='thilini96ucsc@gmail.com';
    var state = getState();
    console.log(state)
    auth.sendPasswordResetEmail(creds.email).then(() =>{
            }).catch((error) => {
         dispatch({type:'PASSWORD_RESET_ERROR',error})
     })
  }
}

// add messages  to the firbase collection
export const sendMessage = (message, senderId, receiverId) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const auth=firebase.auth();
    const firestore = getFirestore();
    
      firestore.collection('chats').doc(senderId).update({
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

// submit inquiries 
export const sendInquiries =( message)=>{
    return( dispatch,getState,{getFirebase,getFirestore}) =>{
      const state= getState()
      const auth= state.firebase.auth

      const firestore = getFirestore()
      firestore.collection('inquiries').add({
        ...message,
        id:auth.uid
      }).then(() =>{
        dispatch ({type: 'SEND_INQUIRY',message})
        }).catch((error) => {
          dispatch({type:'SEND_INQUIRY_ERROR',error})
        })
    }

}
// Unregistered customer can send emails by filling the contact form
export const sendFeedback=(variables)=>{
  return( dispatch,getState,{getFirebase,getFirestore}) =>{

  const templateId = 'template_MDkJHMoB';
  const state=getState()
  window.emailjs.send(
      'gmail', 
      templateId,
      variables
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
  }
export const addNotifications=(notification,dataType,data)=>{
  return(dispatch,getState,{getFirebase,getFirestore}) => {
    const state= getState()
    const auth= state.firebase.auth
    const firestore = getFirestore()
    firestore.collection('notifications').add({
      ...notification,
      from:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
      to:auth.uid,
      data:
    ( dataType =='hire accepted'?"Hire Accepted"
    :dataType =='hire decclined'?"Sorry your Hire has been cancelled "
    :dataType =='hire completed' ? "Hire completed" :null)
      ,
      link:'/User/UserManageTools',   
      createdAt:new Date()}).then(() => {
          dispatch({type: 'Hire_Accept_Notication_Added'});
      }).catch((err) => {
          dispatch({type: 'Notificaton_Add_ERROR', err});
      })
  }
}
export const getProfileImage=(user)=> {
  return(dispatch,getState,{getFirebase,getFirestore}) => {
    // firestore.collection('users').doc(user).update({
    //     ...user,
    //     profilePic:imageUrl
    //   }).then(()=>{
    //       dispatch({type: 'Profile_Image_Added'});
  
    //     })

  // }).catch(function(error) {
  // })
}
}
 export const addProfileImage=(imageUrl)=>{
  return(dispatch,getState,{getFirebase,getFirestore}) => {
    const state= getState()
    const auth= state.firebase.auth
    const firestore = getFirestore()

 
    return  firestore.collection('users').doc(auth.uid).set({
      userType: 'customer',
      disabled: false,
      profilePic:imageUrl
     }).then(()=>{
        dispatch({type: 'Profile_Image_Added'});
      }).catch((err) => {
        dispatch({type: 'Notificaton_Add_ERROR', err});
    })
  }
 }
// export const readNotication=()=>{

//   return(dispatch,getState,{getFirebase,getFirestore}) => {
//     const firestore = getFirestore();
//     firestore.collection('notifications').doc(id).delete().then(() => {
//         dispatch({type: 'NOTIFICATION READ AND DELETED'})
//     }).catch(err => {
//         dispatch({type: 'FAILED TO DELETE NOTIFICATION', err})
//     })
//   }
// }

// export const editHire = (customerId, data, records) => {
//
//     return(dispatch, getState, {getFirebase, getFirestore}) => {
//         const firestore = getFirestore();
//         firestore.collection(records).doc(customerId).update({
//             ...data
//         }).then(() => {
//             dispatch({type: 'DOCUMENT_UPDATED'});
//         }).catch((err) => {
//             dispatch({type: 'ERROR_UPDATING_DOCUMENT', err});
//         })
//     }
// }
