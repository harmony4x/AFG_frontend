import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { arrDay, arrMonth, arrYear } from '../../utils/DayMonthYear'
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { apiUserUpdateUser } from '../../services/apiUserServices';
import { toast } from 'react-toastify';
import './ModalUpdateUser.scss'


const ModalUpdateUser = (props) => {
    const { show, setShow, dataUser, setDataUser, getUserById } = props;

    const handleShow = () => setShow(true);

    const [_id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('default');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [clickSubmit, setClickSubmit] = useState(true)
    const [day, setDay] = useState('1');
    const [month, setMonth] = useState('1');
    const [year, setYear] = useState('1970');
    const [birthday, setBirthday] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [oldImage, setOldImage] = useState('')


    const handleClose = () => {

        setShow(false)
        setId(dataUser._id)
        setName(dataUser.name)
        setAddress(dataUser.address)
        setGender(dataUser.gender)
        setImage(dataUser.image)
        setPhone(dataUser.phone)
        setPreviewImage(dataUser.image)
        setOldImage(dataUser.image)
    };



    useEffect(() => {

        if (!_.isEmpty(dataUser)) {
            setId(dataUser._id)
            setEmail(dataUser.email)
            setPassword(dataUser.password)
            setName(dataUser.name)
            setAddress(dataUser.address)
            setGender(dataUser.gender)
            setImage(dataUser.image)
            setPhone(dataUser.phone)
            setPreviewImage(dataUser.image)
            setOldImage(dataUser.image)

        }
    }, [dataUser])


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
        let cloneBirthday = `${year}-${month}-${day}`

        let data = await apiUserUpdateUser(dataUser._id, password, name, address, gender, image, phone, oldImage, cloneBirthday)
        console.log(data)
        if (data && data.errorCode === 0) {
            toast.success('Update user success');
            handleClose()
            setClickSubmit(true)
            getUserById(_id)
        }

        if (data.errorCode == -1) {
            setClickSubmit(true)

            toast.error(data.message);

        }

    }

    return (
        <>


            <Modal show={show} onHide={handleClose} size='lg' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Tên hiển thị</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}

                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Địa chỉ </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}

                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Giới tính</label>
                                <select id="inputState" className="form-control" value={gender}
                                    onChange={(event) => setGender(event.target.value)}>
                                    <option value={'default'} disabled >Choose...</option>
                                    <option value={'0'}>Nam</option>
                                    <option value={'1'}>Nữ</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Ngày sinh</label>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <select id="inputState" className="form-control" value={day}
                                            onChange={(event) => setDay(event.target.value)}>
                                            <option value={'default'} disabled  >Ngày</option>
                                            {arrDay && arrDay.length > 0 && arrDay.map((d) => {
                                                return <option key={`day-${d}`} value={d}  >{d}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-md-4'>
                                        <select id="inputState" className="form-control" value={month}
                                            onChange={(event) => setMonth(event.target.value)}>
                                            <option value={'default'} disabled >Tháng</option>
                                            {arrMonth && arrMonth.length > 0 && arrMonth.map((m) => {
                                                return <option key={`day-${m}`} value={m}  >{m}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-md-4'>
                                        <select id="inputState" className="form-control" value={year}
                                            onChange={(event) => setYear(event.target.value)}>
                                            <option value={'default'} disabled >Năm</option>
                                            {arrYear && arrYear.length > 0 && arrYear.map((y) => {
                                                return <option key={`day-${y}`} value={y}  >{y}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <label className='label-upload' htmlFor='label-upload' >
                                <AiOutlineCloudUpload /> Chọn ảnh
                            </label>
                            <input type="file" className="form-control" hidden id="label-upload"
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <span style={{ cursor: 'pointer' }} onClick={() => setIsPreviewImage(true)}><img src={previewImage} /></span>
                                : <span>Preview Image</span>
                            }
                            {isPreviewImage &&
                                <Lightbox image={previewImage} title="Image Title" onClose={() => setIsPreviewImage(false)} />
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

export default ModalUpdateUser;