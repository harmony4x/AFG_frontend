import { useState, React } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiLogout, checkToken, refreshNewToken } from '../../services/apiAuthService';
import './header.scss'
import { toast } from 'react-toastify';
import { doRefreshToken, dologout } from '../../redux/action/userAction';
import { GiFeather } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { BiSearch, BiBell } from 'react-icons/bi';
import { MdArrowBack } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import ModalCreatePost from '../HomePage/ModalCreatePost';
import { apiGetCategory } from '../../services/apiCategoryService';
import { apiGetSeriesById } from '../../services/apiSeriesService';
import DefaultUser from '../../assets/avatar-user-default.png'
import { io } from "socket.io-client";

function NavScrollExample(props) {
    const { dataUser } = props
    const socket = io("http://localhost:5000")
    const [showModalCreatePost, setShowModalCreatePost] = useState(false)
    const [showSearch, isShowHideSearch] = useState(false);
    const [showIconSearch, isShowIconSearch] = useState(true);
    const [role, setRole] = useState('')
    const [_id, setId] = useState('');
    const [arrSeries, setArrSeries] = useState('');
    const [categoryArr, setArrCategory] = useState([]);
    const [nontifications, setNontifications] = useState([])


    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
    const access_token = useSelector(state => state?.user?.account?.access_token);
    const refreshToken = useSelector(state => state?.user?.account?.refresh_token);
    const user = useSelector(state => state.user);


    const dispatch = useDispatch();

    const checkRole = async () => {
        if (dataUser) {

            setRole(dataUser?.role)
            setId(dataUser?.userId)
        } else {
            setRole('')
            setId('')
        }

    }



    const HandleClickSearch = () => {
        isShowIconSearch(!showIconSearch)
        isShowHideSearch(!showSearch)
    }
    const HandleHideSearch = () => {
        isShowIconSearch(!showIconSearch)
        isShowHideSearch(!showSearch)
    }

    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleClickSignUp = () => {
        navigate('/register');
    }

    const handleClickLogout = async () => {
        let res = await apiLogout(refreshToken)
        if (res && res.errorCode === 0) {
            setRole('')
            dispatch(dologout());
            navigate('/')
        } else {
            toast.error(res.msg)
        }
    }

    const getSeriesById = async () => {

        let res = await apiGetSeriesById(_id);

        if (res.errorCode === 0 && res.data) {
            setArrSeries(res.data);
        }
    }

    const getAllCategory = async () => {
        let res = await apiGetCategory(_id);

        if (res.errorCode === 0 && res.data) {
            setArrCategory(res.data);
        }
    }

    const setShowModel = () => {
        getSeriesById()
        getAllCategory()
        setShowModalCreatePost(true);
    }

    useEffect(() => {
        getAllCategory()
        if (isAuthenticated === true) {
            checkRole()
        }
    }, [dataUser])

    useEffect(() => {

        // if (isAuthenticated === true && socket) {
        //     socket.on("getNotification", (data) => {
        //         setNontifications((prev) => [...prev, data])
        //     })
        // }

    }, [socket])



    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#"> Adrift Genz</Navbar.Brand> */}
                    <Link to='/' className='navbar-brand'> Adrift Genz</Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 navbar-nav"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/users' className='nav-link'>Users</NavLink>
                            {role === 'admin' &&
                                <NavLink to='/admins' className='nav-link'>Admins</NavLink>
                            }
                        </Nav>
                        {showSearch &&
                            <div className='div-form-search'>
                                <MdArrowBack className='back-search' onClick={() => HandleHideSearch()} />
                                <Form className="d-flex mr-5 form-search">
                                    <Form.Control
                                        show={showSearch}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"

                                    />
                                    <Button className='btn btn-light outline-secondary btn-search' ><BiSearch /></Button>
                                </Form>
                            </div>

                        }

                        {showIconSearch && <Button className='btn btn-light outline-secondary btn-show-search' onClick={() => HandleClickSearch()} ><BsSearch /></Button>}
                        {
                            isAuthenticated === true ?
                                <>

                                    < NavDropdown
                                        title={
                                            <BiBell />
                                        }
                                        id="basic-nav-dropdown"
                                        bsPrefix="drop-down-menu"
                                        className='nav-dropdown nav-notification'
                                    >
                                        <NavDropdown.Item className="notification-title" disabled>
                                            <div className='name-text'>
                                                Thông báo
                                            </div>
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        {
                                            nontifications && nontifications.map((nontification, index) => {

                                                return (

                                                    <NavDropdown.Item key={`nontification-${index}`} className="nav-items row" onClick={() => navigate(`bai-viet/${nontification.slug}`)}>
                                                        <img className='avatar-image' src={nontification.senderImage} />
                                                        <div className='nav-item-content'>
                                                            {`${nontification.senderName} đã bình luận vào bài viết của bạn`}
                                                        </div>
                                                    </NavDropdown.Item>
                                                )

                                            })
                                        }


                                    </NavDropdown>
                                    <button className='btn btn-create' onClick={() => setShowModel()}><GiFeather /> Viết bài</button>
                                    <ModalCreatePost
                                        show={showModalCreatePost}
                                        setShow={setShowModalCreatePost}
                                        _id={_id}
                                        categoryArr={categoryArr}
                                        arrSeries={arrSeries}

                                    />
                                </>
                                : ''
                        }

                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleClickLogin()}>Log In</button>
                                    <button className='btn-signup' onClick={() => handleClickSignUp()}>Sign Up</button>
                                </> :

                                < NavDropdown
                                    title={
                                        <div className='avatar-icon'>
                                            <img src={user.image}></img>
                                        </div>
                                    }
                                    id="basic-nav-dropdown"
                                    bsPrefix="drop-down-menu"
                                    className='nav-dropdown nav-user'
                                >
                                    <NavDropdown.Item className="nav-items" href="/user" disabled>
                                        <div className='name-text'>
                                            {user.name}
                                        </div>
                                        <div className='email-text'>{user.email}</div>
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />


                                    <NavDropdown.Item className="nav-items" onClick={() => navigate(`nguoi-dung/${user.email.split('@')[0]}`)}>
                                        Xem trang cá nhân
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="nav-items" onClick={() => handleClickLogout()}>
                                        Đăng xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>
            <div className='container'>
                <div className='row category-parent'>
                    <div className='col-md-9 category'>
                        <div className='category-item'>Danh muc 1</div>
                        <div className='category-item'>Danh muc 1</div>
                        <div className='category-item'>Danh muc 1</div>


                    </div>
                    <div className='col-md-3 right-category'>
                        <Nav>

                            < NavDropdown
                                title={
                                    <div className='avatar-icon'>
                                        <FaBars />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                bsPrefix="drop-down-menu"
                                className='nav-dropdown nav-category'

                            >
                                {categoryArr && categoryArr.length > 0 && categoryArr.map((item, index) => {

                                    return (

                                        <NavDropdown.Item className="nav-items" href="#" key={`category-${index}`}>
                                            <div style={{ textDecoration: 'none', color: 'black' }}>{item.title}</div>
                                        </NavDropdown.Item>
                                    )
                                })}

                            </NavDropdown>
                        </Nav>
                    </div>
                </div>

            </div>
        </>
    );
}

export default NavScrollExample;