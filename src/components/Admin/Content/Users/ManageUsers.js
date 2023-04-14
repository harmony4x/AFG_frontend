import ModalCreateUser from "./ModalCreateUser"
import './ManageUsers.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";

const ManageUsers = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const handleShowModalCreateUser = () => {
        setShowModalCreateUser(true);
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Users
            </div>
            <div className="user-content">
                <div>
                    <button className="btn btn-primary" onClick={() => handleShowModalCreateUser()}>
                        <FcPlus />Add new user
                    </button>
                </div>
                <div>
                    Table users
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
            />
        </div>
    )
}

export default ManageUsers