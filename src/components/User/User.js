import UserContent from './UserContent';
import './User.scss';
import React, { Component } from 'react';

import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import { useSelector } from 'react-redux';
import { checkToken } from '../../services/apiAuthService';
import { useEffect } from 'react';
import { apiGetUserByEmail, apiGetUserById } from '../../services/apiUserServices';
import Lightbox from "react-awesome-lightbox";
import { apiGetSeriesById } from '../../services/apiSeriesService';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../Layout';


const User = (props) => {
    const { email } = useParams()



    const [show, setShow] = useState(false)
    const [dataUser, setDataUser] = useState('')
    const [_id, setId] = useState('');

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [userSeries, setUserSeries] = useState([])

    const [guestData, setGuestData] = useState('')
    const [matchData, setMatchData] = useState(false)
    const [notFound, setNotFound] = useState(false)



    const handleShowModalUpdateUser = () => {
        setShow(true)
    }
    const access_token = useSelector(state => state?.user?.account?.access_token);
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
    const checkRole = async (access_token) => {
        let res = await checkToken(access_token);

        if (res && res.status != "error") {
            setId(res.data.userId)


            let guest = await getUserByEmail()
            if (guest._id === res.data.userId && notFound == false) {

                getUserById(res.data.userId)
                getSeriesById(res.data.userId)
                setMatchData(true)
            } else {

                getUserById(guest._id)
                getSeriesById(guest._id)
                setMatchData(false)
            }
        } else {
            let guest = await getUserByEmail()

            if (guest) {
                getUserById(guest._id)
                getSeriesById(guest._id)
            }
        }

    }

    const getUserById = async (_id) => {
        let res = await apiGetUserById(_id);

        setDataUser(res.data[0])
    }

    const getPostById = async () => {

    }

    const getUserByEmail = async () => {
        let res = await apiGetUserByEmail(email)
        if (res.errorCode === 0 && res.data != null) {
            setGuestData(res.data)
            setNotFound(false)
        } else {
            setNotFound(true)
        }
        return res.data
    }

    const getSeriesById = async (_id) => {
        let res = await apiGetSeriesById(_id);
        if (res.data && res.errorCode == 0) {
            setUserSeries(res.data)
        }
    }

    const isValidUser = async () => {
        if (isAuthenticated === true) {

            checkRole(access_token)

        } else {
            let guest = await getUserByEmail()

            if (guest) {
                getUserById(guest._id)
                getSeriesById(guest._id)
            }
        }
    }


    useEffect(() => {
        isValidUser()

    }, [])



    if (notFound === false) {
        return (

            <div className="container">
                <div className="row mt-5 user-info">
                    <div className="col-md-3 background-color">
                        <div className="avatar-image">
                            <span style={{ cursor: 'pointer' }} onClick={() => setIsPreviewImage(true)}><img src={dataUser.image} /></span>
                            {isPreviewImage &&
                                <Lightbox image={dataUser.image} title="Image Title" onClose={() => setIsPreviewImage(false)} />
                            }
                        </div>
                        <div className="info mt-3">
                            <span className="info-name">
                                {dataUser.name}
                            </span>
                            <span className="info-email">
                                {dataUser.email}
                            </span>

                            {matchData ?
                                <div className='btn-info'>
                                    <button className='btn btn-secondary' onClick={() => handleShowModalUpdateUser()}>Chỉnh sửa trang cá nhân</button>
                                </div>
                                :
                                ''
                            }


                            <div className='populate'>
                                <div className='populate-content'>
                                    <span>0</span>
                                    <span>followers</span>
                                </div>
                                <div className='populate-content'>
                                    <span>0</span>
                                    <span>following</span>
                                </div>
                                <div className='populate-content'>
                                    <span>0</span>
                                    <span>spiders</span>
                                </div>
                            </div>
                            <ModalUpdateUser
                                show={show}
                                setShow={setShow}
                                dataUser={dataUser}
                                setDataUser={setDataUser}
                                getUserById={getUserById}
                            />
                        </div>
                    </div>
                    <div className="col-md-9 content">
                        <UserContent
                            userSeries={userSeries}
                        />
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div className="alert alert-danger container mt-3" role="alert">
                Không tìm thấy thông tin người dùng
            </div>
        )
    }

}

export default User;