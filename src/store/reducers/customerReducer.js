const initState={
    messages:[
        {id:'1',state:'unread',name:'user',content:'test case 1'},

    ]
}
const customerReducer =(state = initState ,action) => {
    switch(action.type){
        case 'SEND_MESSAGE':
            console.log('sent message',action.message)
            return state
        case 'SEND_MESSAGE_ERROR' :
            console.log('messsage sent error',action.err)
            return state
        default:
            return state
    }
 }
export default customerReducer