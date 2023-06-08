import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import './ModalCreatePost.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyEditor from '../../utils/myEditor';
import { apiGetSeriesById } from '../../services/apiSeriesService';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiGetCategory } from '../../services/apiCategoryService';
import { apiCreatePost } from '../../services/apiPostService';



const ModalCreatePost = (props) => {
    const { show, setShow, _id, arrSeries, categoryArr } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [category, setCategory] = useState('default');
    const [series, setSeries] = useState('default');




    const [clickSubmit, setClickSubmit] = useState(true)

    const handleClose = () => {
        setShow(false)
        setTitle('')
        setDescription('')
        setContent('')
        setImage('')
        setPreviewImage('')
        setIsPreviewImage(false)
        setCategory('default')
        setSeries('default')

    };
    const handleShow = () => setShow(true);

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

        let data = await apiCreatePost(title, description, content, image, category, series, _id);

        if (data && data.status === 200) {
            toast.success(data.message);
            handleClose()
            setClickSubmit(true)


        }

        if (data.status !== 200) {
            setClickSubmit(true)

            toast.error(data.message);

        }
    }





    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static" fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className='col-md-9'>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label>Tên bài viết</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            placeholder="Tiêu đề bài viết ...."

                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Thể loại danh mục </label>
                                        <select id="inputState" className="form-control" value={category}
                                            onChange={(event) => setCategory(event.target.value)}>
                                            <option value={'default'} disabled >Choose...</option>
                                            {categoryArr && categoryArr.length > 0 &&
                                                categoryArr.map((cat, index) => {
                                                    return (
                                                        <option key={`${index}-role`} value={cat._id} >{cat.title}</option>

                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Thuộc series</label>

                                        <select id="inputState" className="form-control" value={series}
                                            onChange={(event) => setSeries(event.target.value)}>
                                            <option value={'default'} disabled >Choose...</option>
                                            {arrSeries && arrSeries.length > 0 &&
                                                arrSeries.map((series, index) => {
                                                    return (
                                                        <option key={`${index}-role`} value={series._id} >{series.title}</option>

                                                    )
                                                })
                                            }
                                        </select>

                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <label >Mô tả bài viết</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        placeholder="Nhập ít thôi nha ..."
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-1 mt-2">
                                <label className='label-upload' htmlFor='label-upload' >
                                    <AiOutlineCloudUpload /> Chọn ảnh
                                </label>
                                <input type="file" className="form-control" hidden id="label-upload"
                                    onChange={(event) => handleUploadImage(event)} />
                            </div>
                            <div className='col-md-1 img-post-preview'>
                                {previewImage ?
                                    <span style={{ cursor: 'pointer' }} onClick={() => setIsPreviewImage(true)}><img src={previewImage} /></span>
                                    : <span>Preview Image</span>
                                }
                                {isPreviewImage &&
                                    <Lightbox image={previewImage} title="Image Title" onClose={() => setIsPreviewImage(false)} />
                                }
                            </div>

                        </div>
                        <div className='form-group mt-4'>

                            <MyEditor
                                content={content}
                                setContent={setContent}
                            />

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
export default ModalCreatePost
