
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from 'lodash';
import { apiUpdateCategory } from '../../../../services/apiCategoryService';


const ModalUpdateCategory = (props) => {
    const { show, setShow, dataCategory, btnClickCloseCategory, fetchListCategorysWithPaginate,
        currentPage,
        setCurrentPage, getPageCount } = props
    const handleClose = () => {
        setShow(false)
        setTitle('')

    };

    const [title, setTitle] = useState('');



    useEffect(() => {

        if (!_.isEmpty(dataCategory)) {
            setTitle(dataCategory.title)
        }
    }, [dataCategory])

    const handleSubmitForm = async () => {


        let data = await apiUpdateCategory(dataCategory._id, title);

        if (data && data.errorCode === 0) {
            toast.success(data.msg);
            handleClose()


            fetchListCategorysWithPaginate(currentPage)
            getPageCount()
        }

        if (data.errorCode == -1) {
            toast.error(data.message);
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label >Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    placeholder="title"
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>

                        </div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitForm()}>
                        Save Changes
                    </Button>



                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateCategory