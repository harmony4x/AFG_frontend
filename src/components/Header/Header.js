import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function NavScrollExample() {
    const [showSearch, isShowHideSearch] = useState(false);
    const [showIconSearch, isShowIconSearch] = useState(true);
    const HandleClickSearch = () => {
        isShowIconSearch(!showIconSearch)
        isShowHideSearch(!showSearch)
    }

    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleClickSignUp = () => {
        navigate('/register');
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
                        <NavLink to='/admins' className='nav-link'>Admins</NavLink>

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
                            < NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Logout
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