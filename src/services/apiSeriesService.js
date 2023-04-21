import axios from '../utils/axiosCustomize';


const apiGetSeries = () => {
    return axios.get('api/series');
}

const apiGetSeriesWithPaginate = (page, limit) => {
    return axios.get(`api/series?page=${page}&limit=${limit}`);
}

const apiCreateSeries = (title, description) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);

    return axios.post('api/series', data);
}


const apiUpdateSeries = (_id, title, description) => {

    const data = new FormData();
    data.append('_id', _id);
    data.append('title', title);
    data.append('description', description);
    return axios.put('api/series', data);
}


const apiDeleteSeries = (_id) => {

    return axios.delete('api/series', { data: { _id } });
}




export {
    apiGetSeries,
    apiCreateSeries,
    apiUpdateSeries,
    apiDeleteSeries,
    apiGetSeriesWithPaginate
}