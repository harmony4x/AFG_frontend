import { useEffect, useState } from "react"
import { apiGetUser } from "../../../../services/apiServices"


const TableUser = (props) => {

    const { listUser, fetchListUser, btnClickUpdateUser, btnClickDetailsUser } = props


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
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
                                <td>
                                    <button className="btn btn-secondary" onClick={() => btnClickDetailsUser(user)}>View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => btnClickUpdateUser(user)}>Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                    {listUser && listUser.length === 0 && <tr>

                        <td colSpan={4}>Not found data</td>

                    </tr>}
                </tbody>
            </table>
        </>
    )
}


export default TableUser