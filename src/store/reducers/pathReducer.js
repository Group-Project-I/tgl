const initState = {
    path: ""
}

// Path reducer to manage paths in the admin component
const pathReducer = (state = initState) => {
    var path = window.location.href.split('/')
    return path[path.length-1]
}

export default pathReducer