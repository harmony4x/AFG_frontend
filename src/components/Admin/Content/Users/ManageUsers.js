import ModalCreateUser from "./ModalCreateUser"
import './ManageUsers.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./TableUser";
import { apiGetUser, apiGetUserWithPaginate } from "../../../../services/apiUserServices"
import { useEffect } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailsUser from "./ModalDetailsUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserWithPaginate from "./TableUserPaginate";

const ManageUsers = (props) => {
    const LIMIT_USER = 5;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDetailsUser, setShowModalDetailsUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [dataUser, setDataUser] = useState({});
    const [listUser, setListUser] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        // fetchListUser()
        getPageCount()
        fetchListUsersWithPaginate(1)
    }, [])

    const fetchListUser = async () => {
        let res = await apiGetUser();
        if (res.errorCode === 0) {
            setListUser(res.data);
        }
    }

    const getPageCount = async () => {
        let count = await apiGetUser();
        let totalCount = 0
        totalCount = count.data.length % LIMIT_USER != 0 ? count.data.length / LIMIT_USER + 1 : count.data.length / LIMIT_USER
        setPageCount(Math.floor(totalCount))

    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await apiGetUserWithPaginate(page, LIMIT_USER);

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

    const btnClickDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataUser(user);

    }

    const btnClickCloseUser = () => {
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
                    {/* <TableUser
                        listUser={listUser}
                        fetchListUser={fetchListUser}
                        btnClickUpdateUser={btnClickUpdateUser}
                        btnClickDetailsUser={btnClickDetailsUser}
                        btnClickDeleteUser={btnClickDeleteUser}
                    /> */}
                    <TableUserWithPaginate
                        listUser={listUser}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        btnClickUpdateUser={btnClickUpdateUser}
                        btnClickDetailsUser={btnClickDetailsUser}
                        btnClickDeleteUser={btnClickDeleteUser}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUser={dataUser}
                btnClickCloseUser={btnClickCloseUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />
            <ModalDetailsUser
                show={showModalDetailsUser}
                setShow={setShowModalDetailsUser}
                dataUser={dataUser}
                btnClickCloseUser={btnClickCloseUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                fetchListUser={fetchListUser}
                dataUser={dataUser}
                btnClickCloseUser={btnClickCloseUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />
        </div>
    )
}

export default ManageUsers