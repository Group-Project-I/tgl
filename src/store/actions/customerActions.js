import firebase from 'firebase/app';
import 'firebase/firestore';
 
export const clean = () => ({
  type: 'CLEAN_UP',
});

// export const recoverPassword = data => async (
//   dispatch,
//   getState,
//   { getFirebase }
// ) => {
//     const firebase = getFirebase();
//   dispatch({ type: 'RECOVERY_START' });
//   try {
//     // send email ehre
//     await firebase.auth().sendPasswordResetEmail(data.email);
//     dispatch ({type: 'RESET_PASSWORD', })
//   } catch (error) {
//     dispatch({type:'PASSWORD_RESET_ERROR',error})
//   }
// };
export const recoverPassword =(email) => {
  return(dispatch ,getState,{getFirebase,getFirestore})=>{
    firebase.auth().sendPasswordResetEmail(email).then(() =>{
        dispatch ({type: 'RESET_PASSWORD',email})
      }).catch((error) => {
         dispatch({type:'PASSWORD_RESET_ERROR',error})
     })
  }
}
export const sendMessage =(message,type) => {
  
  return (dispatch ,getState,{getFirebase,getFirestore})=>{
 
    //   const admin = type.userType === 'admin'? id :null
    
    const state= getState()
    const auth= state.firebase.auth
    const type =state.firebase.profile
    let fromId =auth.uid 
    let toId = auth.uid && type.userType === 'customer' ? 'Admin' : fromId
   
    const firestore = getFirestore()
     firestore.collection('messages').add({
      ...message,
      to:toId,
      from:fromId,
      state:'unread'
      
    }).then(() =>{
         dispatch ({type: 'SEND_MESSAGE',message})
    }).catch((error) => {
      dispatch({type:'SEND_MESSAGE_ERROR',error})
    })
    
  }
}

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
