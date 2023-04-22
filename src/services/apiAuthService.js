
import axios from '../utils/axiosCustomize';


const apiLoginUser = (email, password) => {
    return axios.post('api/login', { email, password });
}

const apiRegisterUser = (email, password, name) => {
    return axios.post('api/register', { email, password, name });
}

export {
    apiLoginUser,
    apiRegisterUser
}