
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from 'lodash';
import { apiUpdateSeries } from '../../../../services/apiSeriesService';



const ModalUpdateSeries = (props) => {
    const { show, setShow, dataSeries, btnClickCloseSeries, fetchListSeriesWithPaginate,
        currentPage,
        setCurrentPage, setDataSeries } = props
    const handleClose = () => {
        setShow(false)
        // setTitle('')
        // setTitle('')
        setDataSeries('')

    };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');



    useEffect(() => {

        if (!_.isEmpty(dataSeries)) {
            setTitle(dataSeries.title)
            setDescription(dataSeries.description)
        }
    }, [dataSeries])

    const handleSubmitForm = async () => {


        let data = await apiUpdateSeries(dataSeries._id, title, description);

        if (data && data.errorCode === 0) {
            toast.success(data.msg);
            handleClose()


            fetchListSeriesWithPaginate(currentPage)
        }

        if (data.errorCode == -1) {
            toast.error(data.data.message);
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update Series</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label >Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    placeholder="title"
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label >Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    placeholder="description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitForm()}>
                        Save Changes
                    </Button>



                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateSeries