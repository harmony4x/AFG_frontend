import { useNavigate, useParams } from "react-router-dom"
import { getCommentByPostId, getPostBySlug } from "../../services/apiPostService"
import { useState } from "react"
import { useEffect, React } from "react"
import './DetailPost.scss'
import DefaultImage from '../../assets/avatar-user-default.png'

import parse from 'html-react-parser';

import { FcLike } from 'react-icons/fc';
import { useSelector } from "react-redux"
import { io } from "socket.io-client";



const DetailPost = (props) => {
    const { slug } = useParams()
    const [data, setData] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isOpenComment, setIsOpenComment] = useState(false)
    const [idParrentComment, setIdParrentComment] = useState('')
    const [comment, setComment] = useState('')
    const [dataComment, setDataComment] = useState([])
    const [dataCommentChild, setDataCommentChild] = useState([])
    const [dataCommentParrent, setDataCommentParrent] = useState([])

    const [parrentComment, setParrentComment] = useState('')
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);

    const [text, setText] = useState('')

    const navigate = useNavigate();

    const socket = io("http://localhost:5000")
    const user = useSelector(state => state.user);

    const isOpenParrentComment = async (parrentCommentId) => {

        setIsOpenComment(true)
        setIdParrentComment(parrentCommentId)
    }


    const findPostBySlug = async () => {
        const res = await getPostBySlug(slug)
        if (res && res.status === 200) {
            setData(res.metadata)
        }
        findCommentByPostId(res?.metadata?._id)

    }

    const findCommentByPostId = async (_id) => {

        const res = await getCommentByPostId(_id)
        const parrent = []
        const child = []
        if (res && res.status === 200) {
            setDataComment(res.metadata)
        }
        const tempDataComment = res.metadata
        if (tempDataComment && tempDataComment.length > 0) {
            tempDataComment.map((items) => {
                if (items.parrentComment === null) {
                    parrent.push(items)
                } else {
                    child.push(items)
                }
            })
        }
        setDataCommentChild(child)
        setDataCommentParrent(parrent)



    }

    const handleClickLogin = () => {
        navigate('/login');
    }


    const handleNotification = (parrentComment) => {
        setIsSubmit(true)

        socket.emit("sendNotification", {
            senderName: user.name,
            senderImage: user.image,
            senderId: user._id,
            receiverName: data.user.email,
            receiverId: data.user._id,
            postSlug: data.slug,
            postId: data._id,
            postTitle: data.title,
            comment,
            parrentComment,
        });

        setComment('')
    };

    useEffect(() => {
        setIsSubmit(false)
        findPostBySlug()

    }, [slug, isSubmit])
    return (
        <div className="container">
            <div className="row m-3">
                <div className="col-sm-12 col-lg-12 app-content">
                    <div className="title mt-3 mb-3">
                        <span>{data?.title}</span>
                    </div>
                    <div className="content" id="single-article">
                        {data?.content ? parse(data?.content) : 'Không có dữ liệu'}

                    </div>
                </div>

            </div>
            {
                isAuthenticated === false ?
                    <>
                        <div className="btn btn-danger " onClick={() => handleClickLogin()}>
                            Đăng nhập để bình luận
                        </div>
                    </>
                    :

                    <>
                        <div className="comment m-3">
                            <div className="comment-content ">

                                <input
                                    type="text"
                                    className="comment-textarea"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết" />

                                <button className="btn-submit btn btn-light" onClick={() => handleNotification()} type="button">Gửi</button>
                            </div>
                            {
                                dataCommentParrent && dataCommentParrent.length > 0 &&
                                dataCommentParrent.map((item, index) => {
                                    return (
                                        <>
                                            <div className="display-comment" key={`parrent-${index}`}>
                                                <div className="display-info">
                                                    <img src={item?.user?.image}></img>
                                                    <div className="display-author">
                                                        <div className="author-info">
                                                            <span className="author-name">{item?.user?.name}</span>
                                                            <span className="author-email">{item?.user?.email.split('@')[0]}</span>
                                                        </div>
                                                        <span className="author-time"> {item.updatedAt.split('T')[0]}</span>
                                                    </div>
                                                </div>
                                                <div className="display-content">
                                                    <div className="display-comment-content">
                                                        {item.content}
                                                    </div>
                                                    <div className="comment-like">
                                                        <span>Thích</span>
                                                        <span onClick={() => isOpenParrentComment(item._id)}>Trả lời</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                dataCommentChild && dataCommentChild.length > 0 && dataCommentChild.map((item2, index2) => {

                                                    if (item?._id.toString() === item2?.parrentComment?._id.toString()) {

                                                        return (
                                                            <div className="display-comment-child" key={`parrent-${index2}`}>
                                                                {
                                                                    isOpenComment === true && <div className="comment-content " >
                                                                        <textarea className="comment-textarea" rows="3" placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                                                                        <button className="btn-submit btn btn-light" onClick={() => handleNotification(idParrentComment)} type="button">Gửi</button>
                                                                    </div>
                                                                }

                                                                <div className="display-info">
                                                                    <img src={item2?.user?.image}></img>
                                                                    <div className="display-author">
                                                                        <div className="author-info">
                                                                            <span className="author-name">{item2?.user?.name}</span>
                                                                            <span className="author-email">{item2?.user?.email.split('@')[0]}</span>
                                                                        </div>
                                                                        <span className="author-time"> {item2.updatedAt.split('T')[0]}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="display-content">
                                                                    <div className="display-comment-content">
                                                                        {item2.content}
                                                                    </div>
                                                                    {/* <div className="comment-like">
                                                                <span>Thích</span>
                                                                <span>Trả lời</span>
                                                            </div> */}
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                })
                                            }
                                        </>
                                    )
                                })
                            }

                        </div>
                    </>

            }



        </div >
    )
}

export default DetailPost