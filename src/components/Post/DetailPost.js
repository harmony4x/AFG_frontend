import { useParams } from "react-router-dom"
import { getPostBySlug } from "../../services/apiPostService"
import { useState } from "react"
import { useEffect, React } from "react"
import './DetailPost.scss'



const DetailPost = (props) => {
    const { slug } = useParams()
    const [data, setData] = useState('')
    const findPostBySlug = async () => {
        const res = await getPostBySlug(slug)
        if (res && res.status === 200) {
            setData(res.metadata)
        }
    }

    useEffect(() => {
        findPostBySlug()
    }, [slug])

    console.log(data)
    return (
        <div className="container">
            <div className="row m-3">
                <div className="col-sm-12 col-lg-9 app-content">
                    <div className="title">
                        <span>{data?.title}</span>
                    </div>
                    <div className="content" id="content">
                        dangerouslySetInnerHTML={{ __html: data?.title }}
                    </div>
                </div>
                <div className="author col-lg-3">
                    muc luc
                </div>
            </div>

        </div>
    )
}

export default DetailPost