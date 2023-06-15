import { useEffect, useState, React } from "react";
import { getAllPost } from "../../services/apiPostService";
import { DisplayFeaturedPost, DisplayNewPost, DisplayTabContent } from "./DisplayPost";
import './homepage.scss';



const HomePage = (props) => {

    const [postNewArr, setNewPostArr] = useState([]);
    const [postHotArr, setHotPostArr] = useState([]);
    const [postTabHotArr, setHotTabPostArr] = useState([]);
    const [postNewTabArr, setNewTabPostArr] = useState([]);
    const [postVoteTabArr, setVoteTabPostArr] = useState([]);
    const findNewPost = async (limit = 4, page = 1, isPublished = true, population = 'user', sort = 'new') => {
        const data = await getAllPost(limit, page, isPublished, population, sort);
        if (data && data.metadata) {
            setNewPostArr(data.metadata)
        }
    }

    const findHotPost = async (limit = 4, page = 1, isPublished = true, population = 'user', sort = 'hot') => {
        const data = await getAllPost(limit, page, isPublished, population, sort);
        if (data && data.metadata) {
            setHotPostArr(data.metadata)
        }
    }

    const findTabPost = async (limit, page, isPublished, population, sort) => {

        const postNew = await getAllPost(limit = 8, page = 1, isPublished = true, population = 'user category', sort = 'new');
        if (postNew && postNew.metadata) {
            setNewTabPostArr(postNew.metadata)
        }



        const hotPost = await getAllPost(limit = 8, page = 1, isPublished = true, population = 'user category', sort = 'hot');
        if (hotPost && hotPost.metadata) {
            setHotTabPostArr(hotPost.metadata)
        }

        const votePost = await getAllPost(limit = 8, page = 1, isPublished = true, population = 'user category', sort = 'vote');
        if (votePost && votePost.metadata) {
            setVoteTabPostArr(votePost.metadata)
        }
    }


    useEffect(() => {
        findNewPost()
        findHotPost()
        findTabPost()
    }, [])
    return (
        <div className="homepage-content container">
            <div className="my-5 display-post">
                <h4>Bài viết mới nhất</h4>
                <DisplayNewPost
                    postNewArr={postNewArr}
                />
            </div>
            <div className="my-5 display-post display-post-background">
                <h4>Bài viết nổi bật</h4>
                <DisplayFeaturedPost
                    postHotArr={postHotArr}
                />
            </div>
            <div className="my-5 row tab-content">
                <div className="col-md-7">
                    <DisplayTabContent
                        postTabHotArr={postTabHotArr}
                        postNewTabArr={postNewTabArr}
                        postVoteTabArr={postVoteTabArr}
                    />
                </div>
                <div className="col-md-5">

                </div>
            </div>
        </div>
    )
}

export default HomePage;