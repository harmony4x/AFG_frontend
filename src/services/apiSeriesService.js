import axios from '../utils/axiosCustomize';


const apiGetSeries = () => {
    return axios.get('api/series');
}

const apiGetSeriesWithPaginate = (page, limit) => {
    return axios.get(`api/series?population=userId&page=${page}&limit=${limit}`);
}

const apiGetSeriesById = (userId) => {

    return axios.get(`api/series/${userId}`);
}

const apiCreateSeries = (title, description, userId) => {

    const data = { title, description, userId };
    return axios.post('api/series', { data });
}


const apiUpdateSeries = (_id, title, description) => {

    const data = { title, description, _id };
    return axios.put('api/series', { data });
}


const apiDeleteSeries = (_id) => {

    return axios.delete('api/series', { data: { _id } });
}




export {
    apiGetSeries,
    apiCreateSeries,
    apiUpdateSeries,
    apiDeleteSeries,
    apiGetSeriesWithPaginate,
    apiGetSeriesById
}