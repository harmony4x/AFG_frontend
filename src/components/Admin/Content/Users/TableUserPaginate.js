import { useEffect, useState } from "react"
import { apiGetUser } from "../../../../services/apiUserServices"
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';




const TableUserWithPaginate = (props) => {

    const {
        listUser,
        btnClickUpdateUser,
        btnClickDetailsUser,
        btnClickDeleteUser,
        pageCount,
        setPageCount,
        fetchListUsersWithPaginate,
        currentPage,
        setCurrentPage,
    } = props


    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((user, index) => {

                        return (
                            <tr key={`table-users-${index}`}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role[0].name}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => btnClickDetailsUser(user)}>View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => btnClickUpdateUser(user)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => btnClickDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                    {listUser && listUser.length === 0 && <tr>

                        <td colSpan={4}>Not found data</td>

                    </tr>}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>

        </>
    )
}


export default TableUserWithPaginate