const initState={
    messages:[
        {id:'1',state:'unread',name:'user',content:'test case 1'},

    ],
    recoverPassword:{
        error:null,
        loading:false
    }
}

const cleanUp = state => {
    return {
      ...state,
      error: null,
      loading: false,
     
      recoverPassword: {
        ...state.recoverPassword,
        loading: false,
        error: null,
      }
     
    }
  }

const customerReducer =(state = initState ,action) => {
    switch(action.type){
        case 'SEND_MESSAGE':
            console.log('sent message',action.message)
            return state
        case 'SEND_MESSAGE_ERROR' :
            console.log('messsage sent error',action.error)
            return state
        case 'RESET_PASSWORD' :
            console.log('CHANGED PASSWORD',action.newPassword)
            return state
        case 'PASSWORD_RESET_ERROR' :
            console.log('PASSWORD_RESET_ERROR',action.error)
            return state
        case 'RESET_EMAIL_SUCCESS':
            console.log('Email updated')
            return{
                ...state,
                authUpdateError: 'Email Updated Successfully'
            }

        case 'RESET_EMAIL_FAILED':
            console.log('Failed to update email')
            return{
                ...state,
                authUpdateError: action.error.message
            }
        case 'CLEAN_UP':
            return cleanUp(state);
        case 'SEND_INQUIRY':
                console.log('sent message',action.message)
                return state
                        
        default:
            return state
    }
 }
export default customerReducer