import axios from '../utils/axiosCustomize';


const apiGetRoles = () => {
    return axios.get('api/role');
}


const apiCreateUser = (email, password, name, address, gender, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('name', name);
    data.append('address', address);
    data.append('gender', gender);
    data.append('role', role);
    data.append('image', image);

    return axios.post('api/customer', data);
}

const apiGetUser = () => {
    return axios.get('api/customers?population=role');
}

const apiGetUserWithPaginate = (page, limit) => {
    return axios.get(`api/customers?population=role&page=${page}&limit=${limit}`);
}


const apiUpdateUser = (_id, password, name, address, gender, role) => {
    const data = new FormData();
    data.append('_id', _id);
    data.append('password', password);
    data.append('name', name);
    data.append('address', address);
    data.append('gender', gender);
    data.append('role', role);

    return axios.put('api/customers', data);
}

const apiDeleteUser = (_id) => {

    return axios.delete('api/customers', { data: { _id } });
}

export {
    apiGetRoles,
    apiCreateUser,
    apiGetUser,
    apiUpdateUser,
    apiDeleteUser,
    apiGetUserWithPaginate
}