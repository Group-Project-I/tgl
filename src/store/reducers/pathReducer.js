const initState = {
    path: ""
}

const pathReducer = (state = initState) => {
    var path = window.location.href.split('/')
    return path[path.length-1]
}

export default pathReducer