import axios from '../utils/axiosCustomize';

const apiCreatePost = (title, description, content, image, category, series, _id) => {


    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('content', content);
    data.append('image', image);
    data.append('category', category);
    data.append('series', series);
    data.append('user', _id);

    return axios.post('api/posts', data);
}

const getAllPost = (limit, page, isPublished, population, sort) => {
    return axios.get(`api/posts?limit=${limit}&page=${page}&isPublished=${isPublished}&population=${population}&sort=${sort}`);
}

const getPostBySlug = (slug) => {
    return axios.get(`api/posts/${slug}`);
}


const getCommentByPostId = (postId) => {
    return axios.get(`api/comments/${postId}`);
}



export {
    apiCreatePost,
    getAllPost,
    getPostBySlug,
    getCommentByPostId,

}