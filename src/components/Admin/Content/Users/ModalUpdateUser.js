import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from 'lodash';
import { apiCreateUser, apiGetRoles, apiUpdateUser } from '../../../../services/apiUserServices'

const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUser, btnClickCloseUser, fetchListUsersWithPaginate,
        currentPage,
        setCurrentPage, getPageCount } = props
    const [arrRole, setArrRole] = useState();
    const [clickSubmit, setClickSubmit] = useState(true)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('default');
    const [role, setRole] = useState('default');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    // setPreviewImage('http://drive.google.com/uc?export=view&id=1Cjib0wyJNm5l9s1gzmLdwH1p7ZGe6NzU')
    const getRole = async () => {
        let res = await apiGetRoles();

        if (res.errorCode === 0 && res.data) {
            setArrRole(res.data);
        }
    }
    useEffect(() => {
        getRole()
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email)
            setPassword(dataUser.password)
            setName(dataUser.name)
            setAddress(dataUser.address)
            setGender(dataUser.gender)
            setRole(dataUser.role[0]._id)
            setImage(dataUser.image)
            setPreviewImage(dataUser.image)

        }
    }, [dataUser])


    const handleClose = () => {

        setShow(false)
        setEmail('')
        setPassword('')
        setName('')
        setAddress('')
        setGender('default')
        setRole('default')
        setImage('')
        setPreviewImage('')
        btnClickCloseUser()
    };
    // const handleShow = () => setShow(true);







    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            setPreviewImage("")
        }
    }

    const handleSubmitForm = async () => {
        setClickSubmit(false)

        let data = await apiUpdateUser(dataUser._id, password, name, address, gender, role);

        if (data && data.errorCode === 0) {
            toast.success('Update user success');
            handleClose()
            setClickSubmit(true)

            fetchListUsersWithPaginate(currentPage)
            getPageCount()
        }

        if (data.errorCode == -1) {
            setClickSubmit(true)

            toast.error(data.message);

        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Email"
                                    disabled />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label >Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    placeholder="Adress"
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Gender</label>
                                <select id="inputState" className="form-control" value={gender}
                                    onChange={(event) => setGender(event.target.value)}>

                                    <option value={'default'} disabled >Choose...</option>
                                    <option value={'0'}>Nam</option>
                                    <option value={'1'}>Nữ</option>

                                </select>
                            </div><div className="form-group col-md-6">
                                <label >Role</label>
                                <select id="inputState" className="form-control" value={role}
                                    onChange={(event) => setRole(event.target.value)}>
                                    <option value={'default'} disabled >Choose...</option>

                                    {arrRole && arrRole.length > 0 &&
                                        arrRole.map((item, index) => {
                                            if (role === item._id) {
                                                return (
                                                    <option key={`${index}-role`} value={item._id} >{item.name}</option>

                                                )
                                            } else {
                                                return (
                                                    <option key={`${index}-role`} value={item._id} >{item.name}</option>

                                                )
                                            }

                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='label-upload' htmlFor='label-upload'>
                                <AiOutlineCloudUpload /> Upload File Image
                            </label >
                            <input disabled type="file" className="form-control" hidden id="label-upload"
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                : <span>Preview Image</span>
                            }
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {clickSubmit ?
                        <Button variant="primary" onClick={() => handleSubmitForm()}>
                            Save Changes
                        </Button>
                        :
                        <Button disabled variant="primary" onClick={() => handleSubmitForm()}>
                            Save Changes
                        </Button>
                    }



                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser