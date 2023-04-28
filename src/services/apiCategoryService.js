import axios from '../utils/axiosCustomize';


const apiGetCategory = () => {
    return axios.get('api/categories');
}

const apiGetCategoryWithPaginate = (page, limit) => {
    return axios.get(`api/categories?page=${page}&limit=${limit}`);
}

const apiCreateCategory = (title, slug) => {

    return axios.post('api/categories', { title });
}


const apiUpdateCategory = (_id, title) => {

    return axios.put('api/categories', { _id, title });
}


const apiDeleteCategory = (_id) => {

    return axios.delete('api/categories', { data: { _id } });
}




export {
    apiGetCategory,
    apiCreateCategory,
    apiUpdateCategory,
    apiDeleteCategory,
    apiGetCategoryWithPaginate
}