import axios from '../utils/axiosCustomize';


const apiGetRoles = () => {
    return axios.get('api/role');
}

const apiCreateRole = (name) => {

    return axios.post('api/role', { name });
}


const apiUpdateRole = (_id, name) => {
    return axios.put('api/role', { _id, name });
}


const apiDeleteRole = (_id) => {

    return axios.delete('api/role', { data: { _id } });
}




export {
    apiGetRoles,
    apiCreateRole,
    apiUpdateRole,
    apiDeleteRole
}