import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { apiDeleteUser } from '../../../../services/apiUserServices';

const ModalDeleteUser = (props) => {

    const { show, setShow, dataUser, fetchListUser, btnClickCloseUser, fetchListUsersWithPaginate,
        currentPage,
        setCurrentPage, getPageCount } = props;
    const handleClose = () => {
        setShow(false);
        btnClickCloseUser()

    }
    const [email, setEmail] = useState("");

    const handleSubmitDelete = async () => {
        //Submit form

        let data = await apiDeleteUser(dataUser._id);

        if (data && data.errorCode === 0) {
            toast.success('Delete user success');
            handleClose();

            setCurrentPage(1)
            fetchListUsersWithPaginate(1)
            getPageCount()
        }
        if (data && data.errorCode === -1) {
            toast.success('Error deleting user');
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete user has email = <b>{dataUser && dataUser.email ? dataUser.email : ""}</b></Modal.Body>
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

export default ModalDeleteUser;