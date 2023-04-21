import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { apiDeleteRole } from '../../../../services/apiRoleService';


const ModalDeleteRol = (props) => {

    const { show, setShow, fetchListRole, dataRole, btnClickCloseRole } = props
    const handleClose = () => {
        setShow(false)
        btnClickCloseRole()

    };
    const [role, setRole] = useState('');


    const handleSubmitDelete = async () => {
        //Submit form

        let data = await apiDeleteRole(dataRole._id);

        if (data && data.errorCode === 0) {
            toast.success('Delete role success');
            handleClose();

            await fetchListRole();
        }
        if (data && data.errorCode === -1) {
            toast.success('Error deleting role');
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete role = <b>{dataRole && dataRole.name ? dataRole.name : ""}</b></Modal.Body>
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

export default ModalDeleteRol;