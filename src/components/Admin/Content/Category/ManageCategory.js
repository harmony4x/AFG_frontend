
import './ManageCategory.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";

import { useEffect } from "react";
import ModalCreateCategory from './ModalCreateCategory';
import { apiGetCategory, apiGetCategoryWithPaginate } from '../../../../services/apiCategoryService';
import TableCategory from './TableCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import TableCategoryWithPaginate from './TableCategoryPaginate';



const ManageCategory = (props) => {
    const LIMIT_USER = 1;

    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);

    const [dataCategory, setDataCategory] = useState({});
    const [listCategory, setListCategory] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        getPageCount()
        fetchListCategorysWithPaginate(1)
    }, [])

    const fetchListCategory = async () => {
        let res = await apiGetCategory();
        if (res.errorCode === 0) {
            setListCategory(res.data);
        }
    }

    const getPageCount = async () => {
        let count = await apiGetCategory();
        let totalCount = 0
        totalCount = count.data.length % LIMIT_USER != 0 ? count.data.length / LIMIT_USER + 1 : count.data.length / LIMIT_USER
        setPageCount(Math.floor(totalCount))

    }

    const fetchListCategorysWithPaginate = async (page) => {
        let res = await apiGetCategoryWithPaginate(page, LIMIT_USER);

        if (res.errorCode === 0) {
            setListCategory(res.data);
        }
    }

    const handleShowModalCreateCategory = () => {
        setShowModalCreateCategory(true);
    }

    const btnClickUpdateCategory = (Category) => {

        setShowModalUpdateCategory(true);
        setDataCategory(Category);

    }

    const btnClickDeleteCategory = (Category) => {
        setShowModalDeleteCategory(true);
        setDataCategory(Category);

    }

    const btnClickCloseCategory = () => {
        setDataCategory({})
    }



    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Categorys
            </div>
            <div className="user-content">
                <div>
                    <button className="btn btn-primary" onClick={() => handleShowModalCreateCategory()}>
                        <FcPlus />Add new Category
                    </button>
                </div>
                <div className="table-content">
                    {/* <TableCategory
                        listCategory={listCategory}
                        btnClickUpdateCategory={btnClickUpdateCategory}
                        btnClickDeleteCategory={btnClickDeleteCategory}
                        fetchListCategorysWithPaginate={fetchListCategorysWithPaginate}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> */}

                    <TableCategoryWithPaginate
                        listCategory={listCategory}
                        btnClickUpdateCategory={btnClickUpdateCategory}
                        btnClickDeleteCategory={btnClickDeleteCategory}
                        fetchListCategorysWithPaginate={fetchListCategorysWithPaginate}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalCreateCategory
                show={showModalCreateCategory}
                setShow={setShowModalCreateCategory}
                fetchListCategorysWithPaginate={fetchListCategorysWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />
            <ModalUpdateCategory
                show={showModalUpdateCategory}
                setShow={setShowModalUpdateCategory}

                dataCategory={dataCategory}
                setDataCategory={setDataCategory}
                btnClickCloseCategory={btnClickCloseCategory}
                fetchListCategorysWithPaginate={fetchListCategorysWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getPageCount={getPageCount}

            />

            <ModalDeleteCategory
                show={showModalDeleteCategory}
                setShow={setShowModalDeleteCategory}

                dataCategory={dataCategory}
                btnClickCloseCategory={btnClickCloseCategory}
                fetchListCategorysWithPaginate={fetchListCategorysWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
        </div>
    )
}

export default ManageCategory