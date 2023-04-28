import { useState } from 'react';
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
import { apiLogout, checkToken } from '../../services/apiAuthService';
import './header.scss'
import { toast } from 'react-toastify';
import { dologout } from '../../redux/action/userAction';
function NavScrollExample() {
    const [showSearch, isShowHideSearch] = useState(false);
    const [showIconSearch, isShowIconSearch] = useState(true);
    const [role, setRole] = useState('')
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
    const access_token = useSelector(state => state?.user?.account?.access_token);
    const refreshToken = useSelector(state => state?.user?.account?.refresh_token);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const checkRole = async (access_token) => {

        let res = await checkToken(access_token);
        setRole(res.data.role)

    }

    if (isAuthenticated === true) {
        checkRole(access_token)

    }
    const HandleClickSearch = () => {
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
            dispatch(dologout());
            navigate('/')
        } else {
            toast.error(res.msg)
        }
    }

    return (
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
                        <Form className="d-flex mr-5">
                            <Form.Control
                                show={showSearch}
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    }

                    {showIconSearch && <Button onClick={() => HandleClickSearch()} variant="outline-success">FaSearch</Button>}
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
                                className='nav-dropdown'
                            >
                                <NavDropdown.Item className="nav-items" href="/user" disabled>
                                    <div className='name-text'>
                                        {user.name}
                                    </div>
                                    <div className='email-text'>{user.email}</div>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />


                                <NavDropdown.Item className="nav-items" href="/users">
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
    );
}

export default NavScrollExample;