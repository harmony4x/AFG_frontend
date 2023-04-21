
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { apiCreateRole } from '../../../../services/apiRoleService';


const ModalCreateRole = (props) => {
    const { show, setShow, fetchListRole } = props
    const handleClose = () => {
        setShow(false)
        setRole('')

    };

    const [role, setRole] = useState('');

    const handleSubmitForm = async () => {


        let data = await apiCreateRole(role);

        if (data && data.errorCode === 0) {
            toast.success(data.msg);
            handleClose()
            await fetchListRole();
        }

        if (data.errorCode == -1) {
            toast.error(data.msg.message);
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Create Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label >Role</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={role}
                                    placeholder="name"
                                    onChange={(event) => setRole(event.target.value)}
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

export default ModalCreateRole