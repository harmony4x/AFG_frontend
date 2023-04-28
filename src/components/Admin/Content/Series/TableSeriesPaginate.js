import { useEffect, useState } from "react"

import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const TableSeriesWithPaginate = (props) => {

    const {
        listSeries,
        btnClickUpdateSeries,
        btnClickDeleteSeries,
        pageCount,
        setPageCount,
        fetchListSeriesWithPaginate,
        currentPage,
        setCurrentPage,

    } = props

    const handlePageClick = (event) => {
        fetchListSeriesWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Series</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Description</th>
                        <th scope="col">User</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {listSeries && listSeries.length > 0 && listSeries.map((series, index) => {
                        return (
                            <tr key={`table-series-${index}`}>
                                <th scope="row">{index + 1}</th>
                                <td>{series.title}</td>
                                <td>{series.slug}</td>
                                <td>{series.description}</td>
                                <td>{series.userId[0].name}</td>
                                <td>{series.createdAt}</td>
                                <td>{series.updatedAt}</td>
                                <td className="d-flex">
                                    <button className="btn btn-warning mx-3" onClick={() => btnClickUpdateSeries(series)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => btnClickDeleteSeries(series)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                    {listSeries && listSeries.length === 0 && <tr>

                        <td colSpan={4}>Not found data</td>

                    </tr>}
                </tbody>
            </table>
            {pageCount > 1 &&
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
            }
        </>
    )
}


export default TableSeriesWithPaginate