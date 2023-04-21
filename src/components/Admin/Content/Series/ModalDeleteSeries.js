import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { apiDeleteSeries } from '../../../../services/apiSeriesService';




const ModalDeleteSeries = (props) => {

    const { show, setShow, dataSeries, btnClickCloseSeries, fetchListSeriesWithPaginate,
        currentPage,
        setCurrentPage, getPageCount } = props
    const handleClose = () => {
        setShow(false)
        btnClickCloseSeries()

    };
    const [Series, setSeries] = useState('');


    const handleSubmitDelete = async () => {
        //Submit form

        let data = await apiDeleteSeries(dataSeries._id);

        if (data && data.errorCode === 0) {
            toast.success('Delete Series success');
            handleClose();

            setCurrentPage(1)
            fetchListSeriesWithPaginate(1)
            getPageCount()
        }
        if (data && data.errorCode === -1) {
            toast.success('Error deleting Series');
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Series</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete Series = <b>{dataSeries && dataSeries.name ? dataSeries.name : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { handleSubmitDelete() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteSeries;