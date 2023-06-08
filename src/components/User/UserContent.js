import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { Link, NavLink, useNavigate } from "react-router-dom";
import thumnail from '../../assets/defaultthumbnail.png'
import { FcPlus } from 'react-icons/fc';

const UserContent = (props) => {
    const { userSeries } = props;
    return (
        <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="home" title="Bài viết" >
                Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Series">
                <div className='mb-4 btn-series' >
                    <button className="btn btn-primary btn-new-series" >
                        <FcPlus />Tạo series
                    </button>
                </div>
                <div className='row'>
                    {userSeries && userSeries.length > 0 && userSeries.map((items, index) => {

                        return (

                            <Card key={`DisplayNewPost-${index}`} className='col-md-4'>
                                <Card.Img className='post-image' variant="top" src={thumnail} />
                                <Card.Body>
                                    <Card.Title className='row'>
                                        <Link className='col-md-9 post-title'>{items.title}</Link>

                                    </Card.Title>

                                    {/* <Button variant="primary">Go somewhere</Button> */}
                                    <div className='card-detail-button'>
                                        <span>0 bài viết</span>
                                        <a className='btn btn-detail'>Chi tiết</a>


                                    </div>
                                </Card.Body>
                            </Card>


                        )
                    })}

                </div>
            </Tab>
            <Tab eventKey="longer-tab" title="Loooonger Tab">
                Tab content for Loooonger Tab
            </Tab>

        </Tabs>
    );
}

export default UserContent;