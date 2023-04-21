
import './ManageSeries.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";

import { useEffect } from "react";
import { apiGetSeries, apiGetSeriesWithPaginate } from '../../../../services/apiSeriesService';
import TableSeriesWithPaginate from './TableCategoryPaginate';
import ModalCreateSeries from './ModalCreateSeries';
import ModalUpdateSeries from './ModalUpdateCategory';
import ModalDeleteSeries from './ModalDeleteSeries';



const ManageSeries = (props) => {
    const LIMIT_USER = 3;

    const [showModalCreateSeries, setShowModalCreateSeries] = useState(false);
    const [showModalUpdateSeries, setShowModalUpdateSeries] = useState(false);
    const [showModalDeleteSeries, setShowModalDeleteSeries] = useState(false);

    const [dataSeries, setDataSeries] = useState({});
    const [listSeries, setListSeries] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        getPageCount()
        fetchListSeriessWithPaginate(1)
    }, [])

    const fetchListSeries = async () => {
        let res = await apiGetSeries();
        if (res.errorCode === 0) {
            setListSeries(res.data);
        }
    }

    const getPageCount = async () => {
        let count = await apiGetSeries();
        let totalCount = 0
        totalCount = count.data.length % LIMIT_USER != 0 ? count.data.length / LIMIT_USER + 1 : count.data.length / LIMIT_USER
        setPageCount(Math.floor(totalCount))

    }

    const fetchListSeriessWithPaginate = async (page) => {
        let res = await apiGetSeriesWithPaginate(page, LIMIT_USER);

        if (res.errorCode === 0) {
            setListSeries(res.data);
        }
    }

    const handleShowModalCreateSeries = () => {
        setShowModalCreateSeries(true);
    }

    const btnClickUpdateSeries = (series) => {

        setShowModalUpdateSeries(true);
        setDataSeries(series);

    }

    const btnClickDeleteSeries = (series) => {
        setShowModalDeleteSeries(true);
        setDataSeries(series);

    }

    const btnClickCloseSeries = () => {
        setDataSeries({})
    }



    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Series
            </div>
            <div className="user-content">
                <div>
                    <button className="btn btn-primary" onClick={() => handleShowModalCreateSeries()}>
                        <FcPlus />Add new Series
                    </button>
                </div>
                <div className="table-content">
                    {/* <TableSeries
                        listSeries={listSeries}
                        btnClickUpdateSeries={btnClickUpdateSeries}
                        btnClickDeleteSeries={btnClickDeleteSeries}
                        fetchListSeriessWithPaginate={fetchListSeriessWithPaginate}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> */}

                    <TableSeriesWithPaginate
                        listSeries={listSeries}
                        btnClickUpdateSeries={btnClickUpdateSeries}
                        btnClickDeleteSeries={btnClickDeleteSeries}
                        fetchListSeriesWithPaginate={fetchListSeriessWithPaginate}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalCreateSeries
                show={showModalCreateSeries}
                setShow={setShowModalCreateSeries}
                fetchListSeriesWithPaginate={fetchListSeriessWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}
            />
            <ModalUpdateSeries
                show={showModalUpdateSeries}
                setShow={setShowModalUpdateSeries}

                dataSeries={dataSeries}
                btnClickCloseSeries={btnClickCloseSeries}
                fetchListSeriesWithPaginate={fetchListSeriessWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />

            <ModalDeleteSeries
                show={showModalDeleteSeries}
                setShow={setShowModalDeleteSeries}

                dataSeries={dataSeries}
                btnClickCloseSeries={btnClickCloseSeries}
                fetchListSeriesWithPaginate={fetchListSeriessWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />
        </div>
    )
}

export default ManageSeries