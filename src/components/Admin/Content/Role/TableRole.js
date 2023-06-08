import { useEffect, useState, React } from "react"



const TableRole = (props) => {

    const { listRole, fetchListRole, btnClickUpdateRole, btnClickDeleteRole } = props


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {listRole && listRole.length > 0 && listRole.map((role, index) => {

                        return (
                            <tr key={`table-users-${index}`}>
                                <th scope="row">{index + 1}</th>
                                <td>{role.name}</td>
                                <td>{role.createdAt}</td>
                                <td>{role.updatedAt}</td>
                                <td>
                                    <button className="btn btn-warning mx-3" onClick={() => btnClickUpdateRole(role)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => btnClickDeleteRole(role)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                    {listRole && listRole.length === 0 && <tr>

                        <td colSpan={4}>Not found data</td>

                    </tr>}
                </tbody>
            </table>
        </>
    )
}


export default TableRole