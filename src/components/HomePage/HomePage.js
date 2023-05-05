import { DisplayFeaturedPost, DisplayNewPost, DisplayTabContent } from "./DisplayPost";
import './homepage.scss';

const HomePage = () => {
    return (
        <div className="homepage-content container">
            <div className="my-5 display-post">
                <h4>Bài viết mới nhất</h4>
                <DisplayNewPost />
            </div>
            <div className="my-5 display-post display-post-background">
                <h4>Bài viết nổi bật</h4>
                <DisplayFeaturedPost />
            </div>
            <div className="my-5 row">
                <div className="col-md-7">
                    <DisplayTabContent />
                </div>
                <div className="col-md-5">

                </div>
            </div>
        </div>
    )
}

export default HomePage;