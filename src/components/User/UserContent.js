import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UserContent = () => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="home" title="Bài viết">
                Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Series">
                Tab content for Profile
            </Tab>
            <Tab eventKey="longer-tab" title="Loooonger Tab">
                Tab content for Loooonger Tab
            </Tab>

        </Tabs>
    );
}

export default UserContent;