const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Invalid Credentials'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout Success')
            return state
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message
            }
        case 'EMAIL_UPDATED':
            console.log('Email updated')
            return{
                ...state,
                authUpdateError: 'Email Updated Successfully'
            }
        case 'FAILED_TO_UPDATE_EMAIL':
            console.log('Failed to update email')
            return{
                ...state,
                authUpdateError: action.err.message
            }
        case 'FAILED_TO_REAUTHENTICATE':
            console.log('Failed to reauthenticate', action.err.message)
            return{
                ...state,
                authUpdateError: 'Invalid Password'
            }
        case 'PASSWORD_UPDATED':
            console.log('Password Updated')
            return{
                ...state,
                authUpdateError: 'Password Updated Successfully'
            }
        case 'FAILED_TO_UPDATE_PASSWORD':
            console.log('Failed to update password')
            return{
                ...state,
                authUpdateError: action.err.message
            }
        default:
            return state
    }
}

export default authReducer