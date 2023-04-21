import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { apiDeleteCategory } from '../../../../services/apiCategoryService';



const ModalDeleteCategory = (props) => {

    const { show, setShow, dataCategory, btnClickCloseCategory, fetchListCategorysWithPaginate,
        currentPage,
        setCurrentPage, } = props
    const handleClose = () => {
        setShow(false)
        btnClickCloseCategory()

    };
    const [category, setCategory] = useState('');


    const handleSubmitDelete = async () => {
        //Submit form

        let data = await apiDeleteCategory(dataCategory._id);

        if (data && data.errorCode === 0) {
            toast.success('Delete Category success');
            handleClose();

            setCurrentPage(1)
            fetchListCategorysWithPaginate(1)
        }
        if (data && data.errorCode === -1) {
            toast.success('Error deleting Category');
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete Category = <b>{dataCategory && dataCategory.name ? dataCategory.name : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { handleSubmitDelete() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteCategory;