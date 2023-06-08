
import './ManageRole.scss';
import { FcPlus } from 'react-icons/fc';
import { useState, React } from "react";

import { useEffect } from "react";
import ModalCreateRole from "./ModalCreateRole";
import TableRole from "./TableRole";
import { apiGetRoles } from "../../../../services/apiRoleService";
import ModalUpdateRole from './ModalUpdateRole';
import ModalDeleteRol from './ModalDeteleRole';


const ManageRoles = (props) => {

    const [showModalCreateRole, setShowModalCreateRole] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDetailsRole, setShowModalDetailsRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);

    const [dataRole, setDataRole] = useState({});
    const [listRole, setListRole] = useState([])

    useEffect(() => {
        fetchListRole()
    }, [])

    const fetchListRole = async () => {
        let res = await apiGetRoles();
        if (res.errorCode === 0) {
            setListRole(res.data);
        }
    }
    const handleShowModalCreateRole = () => {
        setShowModalCreateRole(true);
    }

    const btnClickUpdateRole = (role) => {

        setShowModalUpdateRole(true);
        setDataRole(role);

    }

    const btnClickDetailsRole = (role) => {
        setShowModalDetailsRole(true);
        setDataRole(role);

    }

    const btnClickDeleteRole = (role) => {
        setShowModalDeleteRole(true);
        setDataRole(role);

    }

    const btnClickCloseRole = () => {
        setDataRole({})
    }



    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Roles
            </div>
            <div className="user-content">
                <div>
                    <button className="btn btn-primary" onClick={() => handleShowModalCreateRole()}>
                        <FcPlus />Add new Role
                    </button>
                </div>
                <div className="table-content">
                    <TableRole
                        listRole={listRole}
                        fetchListRole={fetchListRole}
                        btnClickUpdateRole={btnClickUpdateRole}
                        btnClickDeleteRole={btnClickDeleteRole}
                    />
                </div>
            </div>
            <ModalCreateRole
                show={showModalCreateRole}
                setShow={setShowModalCreateRole}
                fetchListRole={fetchListRole}
            />
            <ModalUpdateRole
                show={showModalUpdateRole}
                setShow={setShowModalUpdateRole}
                fetchListRole={fetchListRole}
                dataRole={dataRole}
                btnClickCloseRole={btnClickCloseRole}
                setDataRole={setDataRole}
            />

            <ModalDeleteRol
                show={showModalDeleteRole}
                setShow={setShowModalDeleteRole}
                fetchListRole={fetchListRole}
                dataRole={dataRole}
                btnClickCloseRole={btnClickCloseRole}

            />
        </div>
    )
}

export default ManageRoles