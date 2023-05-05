import UserContent from './UserContent';
import './User.scss';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import { useSelector } from 'react-redux';
import { checkToken } from '../../services/apiAuthService';
import { useEffect } from 'react';
import { apiGetUserById } from '../../services/apiUserServices';
import Lightbox from "react-awesome-lightbox";


const User = () => {
    const [show, setShow] = useState(false)
    const [dataUser, setDataUser] = useState('')
    const [_id, setId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const handleShowModalUpdateUser = () => {
        setShow(true)
    }
    const access_token = useSelector(state => state?.user?.account?.access_token);

    const checkRole = async (access_token) => {
        let res = await checkToken(access_token);
        setId(res.data.userId)
        setIsAuthenticated(true)
        getUserById(res.data.userId)
    }

    const getUserById = async (_id) => {
        let res = await apiGetUserById(_id);

        setDataUser(res.data[0])
    }
    useEffect(() => {
        checkRole()

    }, [])



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
                        <div className='btn-info'>
                            <button className='btn btn-secondary' onClick={() => handleShowModalUpdateUser()}>Chỉnh sửa trang cá nhân</button>
                        </div>
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
                    <UserContent />
                </div>
            </div>

        </div>
    )
}

export default User;