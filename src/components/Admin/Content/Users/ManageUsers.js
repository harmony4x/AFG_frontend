import ModalCreateUser from "./ModalCreateUser"
import './ManageUsers.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./TableUser";
import { apiGetUser } from "../../../../services/apiServices"
import { useEffect } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailsUser from "./ModalDetailsUser";

const ManageUsers = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDetailsUser, setShowModalDetailsUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await apiGetUser();
        if (res.errorCode === 0) {
            setListUser(res.data);
        }
    }
    const handleShowModalCreateUser = () => {
        setShowModalCreateUser(true);
    }

    const btnClickUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUser(user);

    }

    const btnClickDetailsUser = (user) => {
        setShowModalDetailsUser(true);
        setDataUser(user);

    }

    const btnClickCloseUpdateUser = () => {
        setDataUser({})
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
                <div className="table-content">
                    <TableUser
                        listUser={listUser}
                        fetchListUser={fetchListUser}
                        btnClickUpdateUser={btnClickUpdateUser}
                        btnClickDetailsUser={btnClickDetailsUser}
                    />
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUser={fetchListUser}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                fetchListUser={fetchListUser}
                dataUser={dataUser}
                btnClickCloseUpdateUser={btnClickCloseUpdateUser}
            />
            <ModalDetailsUser
                show={showModalDetailsUser}
                setShow={setShowModalDetailsUser}
                fetchListUser={fetchListUser}
                dataUser={dataUser}
                btnClickCloseUpdateUser={btnClickCloseUpdateUser}
            />
        </div>
    )
}

export default ManageUsers