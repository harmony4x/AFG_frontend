import { useState, React } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BsBookmark } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getNewPost } from '../../services/apiPostService';
import { Link, NavLink, useNavigate } from "react-router-dom";

const moment = require('moment');
require('moment/locale/vi');
moment.locale('vi'); // Set the locale to Vietnamese



const DisplayNewPost = (props) => {
    const navigate = useNavigate();
    const limitText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }

        const truncatedText = text.substring(0, maxLength) + '...';
        return truncatedText;
    }

    let { postNewArr } = props



    return (
        <div className='post-flex'>
            {postNewArr && postNewArr.length > 0 && postNewArr.map((items, index) => {
                const timeString = items.updatedAt
                const date = moment(timeString);
                const relativeTime = date.fromNow(true);

                return (

                    <Card style={{ width: '18rem' }} key={`DisplayNewPost-${index}`}>
                        <Card.Img className='post-image' variant="top" src={items.image} />
                        <Card.Body>
                            <Card.Title className='row'>
                                <div className='col-md-9 post-title' onClick={() => navigate(`/bai-viet/${items.slug}`)}>{limitText(items.title, 50)}</div>
                                <div className='col-md-3'>
                                    <BsBookmark />
                                    <BsThreeDotsVertical />
                                </div>
                            </Card.Title>

                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <div className='row'>
                                <div className='col-md-6'>
                                    <span className='post-author'>{items.user.name}</span>
                                </div>
                                <div className='col-md-6 post-time-div'>
                                    <span className='post-time'>{relativeTime} trước</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>


                )
            })}

        </div>
    );
}
const DisplayFeaturedPost = (props) => {
    const navigate = useNavigate();
    const limitText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }

        const truncatedText = text.substring(0, maxLength) + '...';
        return truncatedText;
    }

    let { postHotArr } = props

    return (
        <div className='post-flex'>
            {postHotArr && postHotArr.length > 0 && postHotArr.map((items, index) => {
                const timeString = items.updatedAt
                const date = moment(timeString);
                const relativeTime = date.fromNow(true);

                return (

                    <Card style={{ width: '18rem' }} key={`DisplayNewPost-${index}`}>
                        <Card.Img className='post-image' variant="top" src={items.image} />
                        <Card.Body>
                            <Card.Title className='row'>
                                <div className='col-md-9 post-title' onClick={() => navigate(`/bai-viet/${items.slug}`)}>{limitText(items.title, 50)}</div>
                                <div className='col-md-3'>
                                    <BsBookmark />
                                    <BsThreeDotsVertical />
                                </div>
                            </Card.Title>

                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <div className='row'>
                                <div className='col-md-6'>
                                    <span className='post-author'>{items.user.name}</span>
                                </div>
                                <div className='col-md-6 post-time-div'>
                                    <span className='post-time'>{relativeTime} trước</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>


                )
            })}
        </div>
    );
}



const DisplayTabContent = (props) => {
    const navigate = useNavigate();
    const limitText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }

        const truncatedText = text.substring(0, maxLength) + '...';
        return truncatedText;
    }
    const { postTabHotArr, postNewTabArr, postVoteTabArr } = props
    // console.log(postNewHotArr.length)
    return (
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="Mới nhất" >
                {
                    postNewTabArr && postNewTabArr.length > 0 && postNewTabArr.map((items, index) => {
                        const timeString = items.updatedAt
                        const date = moment(timeString);
                        const relativeTime = date.fromNow(true);

                        return (
                            <div className='card-gallery row mb-5' key={`DisplayTabNewPost-${index}`}>
                                <img className='card-gallery-image col-md-4' title='hinh anh o day ne' src={items.image} />
                                <div className='col-md-8 tab-display-posts'>
                                    <div className='card-gallery-category card-gallery-item row'>
                                        <div className='card-display mb-2 col-md-10'>
                                            <a className='text-uppercase fst-normal card-display-category' onClick={() => navigate(`/danh-muc/${items.category.title}`)}>{items.category.title}</a>
                                        </div>

                                        <div className='col-md-2 card-vote'>
                                            <BsBookmark />
                                            <BsThreeDotsVertical />
                                        </div>
                                    </div>
                                    <div className='card-gallery-title card-gallery-item fw-bold'>
                                        <div className='card-display-title fst-normal' onClick={() => navigate(`/bai-viet/${items.slug}`)}>{limitText(items.title, 70)}</div>
                                    </div>
                                    <div className='card-gallery-description card-gallery-item m-1'>
                                        {limitText(items.description, 100)}
                                    </div>
                                    <div className='card-gallery-author card-gallery-item row mt-3'>
                                        <img className='card-avatar-image col-md-3' title='hinh anh o day ne' src={items.image} />
                                        <div className='col-md-9 card-author-name'>{items.user.name} - <span className='card-author-time'>{relativeTime} trước</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </Tab>
            <Tab eventKey="new" title="Nổi bật">
                {
                    postTabHotArr && postTabHotArr.length > 0 && postTabHotArr.map((items, index) => {
                        const timeString = items.updatedAt
                        const date = moment(timeString);
                        const relativeTime = date.fromNow(true);

                        return (
                            <div className='card-gallery row mb-5' key={`DisplayTabNewPost-${index}`}>
                                <img className='card-gallery-image col-md-4' title='hinh anh o day ne' src={items.image} />
                                <div className='col-md-8 tab-display-posts'>
                                    <div className='card-gallery-category card-gallery-item row'>
                                        <div className='card-display mb-2 col-md-10'>
                                            <a className='text-uppercase fst-normal card-display-category' href='#'>{items.category.title}</a>
                                        </div>

                                        <div className='col-md-2 card-vote'>
                                            <BsBookmark />
                                            <BsThreeDotsVertical />
                                        </div>
                                    </div>
                                    <div className='card-gallery-title card-gallery-item fw-bold'>
                                        <Link className='card-display-title fst-normal'>{limitText(items.title, 70)}</Link>
                                    </div>
                                    <div className='card-gallery-description card-gallery-item m-1'>
                                        {limitText(items.description, 100)}
                                    </div>
                                    <div className='card-gallery-author card-gallery-item row mt-3'>
                                        <img className='card-avatar-image col-md-3' title='hinh anh o day ne' src={items.image} />
                                        <div className='col-md-9 card-author-name'>{items.user.name} - <span className='card-author-time'>{relativeTime} trước</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Tab>
            <Tab eventKey="hot" title="Đánh giá cao">
                {
                    postVoteTabArr && postVoteTabArr.length > 0 && postVoteTabArr.map((items, index) => {
                        const timeString = items.updatedAt
                        const date = moment(timeString);
                        const relativeTime = date.fromNow(true);

                        return (
                            <div className='card-gallery row mb-5' key={`DisplayTabNewPost-${index}`}>
                                <img className='card-gallery-image col-md-4' title='hinh anh o day ne' src={items.image} />
                                <div className='col-md-8 tab-display-posts'>
                                    <div className='card-gallery-category card-gallery-item row'>
                                        <div className='card-display mb-2 col-md-10'>
                                            <a className='text-uppercase fst-normal card-display-category' href='#'>{items.category.title}</a>
                                        </div>

                                        <div className='col-md-2 card-vote'>
                                            <BsBookmark />
                                            <BsThreeDotsVertical />
                                        </div>
                                    </div>
                                    <div className='card-gallery-title card-gallery-item fw-bold'>
                                        <Link className='card-display-title fst-normal'>{limitText(items.title, 70)}</Link>
                                    </div>
                                    <div className='card-gallery-description card-gallery-item m-1'>
                                        {limitText(items.description, 100)}
                                    </div>
                                    <div className='card-gallery-author card-gallery-item row mt-3'>
                                        <img className='card-avatar-image col-md-3' title='hinh anh o day ne' src={items.image} />
                                        <div className='col-md-9 card-author-name'>{items.user.name} - <span className='card-author-time'>{relativeTime} trước</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Tab>
            {/* <Tab eventKey="top" title="Đánh giá cao">
                Tab content for Home
            </Tab> */}
        </Tabs>
    );
}



export {
    DisplayNewPost,
    DisplayFeaturedPost,
    DisplayTabContent
};