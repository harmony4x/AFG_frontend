
import axios from '../utils/axiosCustomize';


const apiLoginUser = (email, password) => {
    return axios.post('api/login', { email, password });
}

const apiRegisterUser = (email, password, name) => {
    return axios.post('api/register', { email, password, name });
}

const checkToken = (token) => {
    return axios.get('api/check-token');
}

const apiLogout = (refreshToken) => {

    return axios.post('api/logout', { refreshToken });
}

export {
    apiLoginUser,
    apiRegisterUser,
    checkToken,
    apiLogout
}