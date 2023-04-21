import axios from '../utils/axiosCustomize';


const apiGetRoles = () => {
    return axios.get('api/role');
}

const apiCreateRole = (name) => {
    const data = new FormData();
    data.append('name', name);
    return axios.post('api/role', data);
}


const apiUpdateRole = (_id, name) => {

    const data = new FormData();
    data.append('_id', _id);
    data.append('name', name);
    return axios.put('api/role', data);
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