import axios from '../utils/axiosCustomize';


const apiGetCategory = () => {
    return axios.get('api/categories');
}

const apiGetCategoryWithPaginate = (page, limit) => {
    return axios.get(`api/categories?page=${page}&limit=${limit}`);
}

const apiCreateCategory = (title, slug) => {
    const data = new FormData();
    data.append('title', title);

    return axios.post('api/categories', data);
}


const apiUpdateCategory = (_id, title) => {

    const data = new FormData();
    data.append('_id', _id);
    data.append('title', title);
    return axios.put('api/categories', data);
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