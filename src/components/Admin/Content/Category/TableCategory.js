import { useEffect, useState } from "react"



const TableCategory = (props) => {

    const { listCategory, fetchListCategory, btnClickUpdateCategory, btnClickDeleteCategory } = props


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory && listCategory.length > 0 && listCategory.map((category, index) => {

                        return (
                            <tr key={`table-category-${index}`}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.title}</td>
                                <td>{category.slug}</td>
                                <td>{category.createdAt}</td>
                                <td>{category.updatedAt}</td>
                                <td>
                                    <button className="btn btn-warning mx-3" onClick={() => btnClickUpdateCategory(category)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => btnClickDeleteCategory(category)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                    {listCategory && listCategory.length === 0 && <tr>

                        <td colSpan={4}>Not found data</td>

                    </tr>}
                </tbody>
            </table>
        </>
    )
}


export default TableCategory