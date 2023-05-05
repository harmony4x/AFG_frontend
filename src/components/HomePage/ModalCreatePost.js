import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import './ModalCreatePost.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';


const ModalCreatePost = (props) => {
    const { show, setShow, _id } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [isPreviewImage, setIsPreviewImage] = useState(false)

    const [clickSubmit, setClickSubmit] = useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(content)
    ClassicEditor
        .create(document.querySelector('#editor'), {
            plugins: [Base64UploadAdapter, /* ... */],
            toolbar: [ /* ... */]
        })
        .then( /* ... */)
        .catch( /* ... */);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {

            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            setPreviewImage("")
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

                            <div className="form-group col-md-3">
                                <label>Tên bài viết</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Tiêu đề bài viết ...."

                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Mô tả bài viết</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    placeholder="Nhập ít thôi nha ..."
                                    onChange={(event) => setDescription(event.target.value)}
                                />
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
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}

                                onReady={editor => {
                                    editor.editing.view.change((write) => {
                                        write.setStyle(
                                            "height",
                                            "400px",
                                            editor.editing.view.document.getRoot()
                                        )
                                    })
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data)
                                }}

                            />

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreatePost
