const initState = {
    path: ""
}

const pathReducer = (state = initState) => {
    var path = window.location.href.split('/')
    // console.log('path',path[path.length-1])
    // if(path.length > 3 && path[path.length-2] === 'admin'){
        return path[path.length-1]
    // }else{
    //     return state
    // }
}

export default pathReducer