import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BsBookmark } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';


const DisplayNewPost = () => {
    let count = [1, 2, 3, 4];

    return (
        <div className='post-flex'>
            {count && count.length > 0 && count.map((items, index) => {
                return (

                    <Card style={{ width: '18rem' }} key={`DisplayNewPost-${index}`}>
                        <Card.Img className='post-image' variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <span className='post-author'>Tác giả</span>
                        </Card.Body>
                    </Card>


                )
            })}
        </div>
    );
}
const DisplayFeaturedPost = () => {
    let count = [1, 2, 3, 4];

    return (
        <div className='post-flex'>
            {count && count.length > 0 && count.map((items, index) => {
                return (

                    <Card style={{ width: '18rem' }} key={`DisplayFeaturePost-${index}`}>
                        <Card.Img className='post-image' variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <span className='post-author'>Tác giả</span>
                        </Card.Body>

                    </Card>


                )
            })}
        </div>
    );
}



const DisplayTabContent = () => {
    return (
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="Dành cho bạn">
                <div className='card-gallery row'>
                    <img className='card-gallery-image col-md-3' title='hinh anh o day ne' />
                    <div className='col-md-9'>
                        <div className='card-gallery-category card-gallery-item'>
                            <div >Quan Điểm - Tranh Luận</div>

                            <div>
                                <BsBookmark />
                                <BsThreeDotsVertical />
                            </div>
                        </div>
                        <div className='card-gallery-title card-gallery-item'>
                            Ngày 30-4-2022
                        </div>
                        <div className='card-gallery-text card-gallery-item'>
                            trước khi vào bài
                        </div>
                        <div className='card-gallery-author card-gallery-item'>
                            Tác giả
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="new" title="Mới nhất">
                Tab content for Profile
            </Tab>
            <Tab eventKey="hot" title="Nổi bật">
                Tab content for Contact
            </Tab>
            <Tab eventKey="top" title="Đánh giá cao">
                Tab content for Home
            </Tab>
        </Tabs>
    );
}



export {
    DisplayNewPost,
    DisplayFeaturedPost,
    DisplayTabContent
};