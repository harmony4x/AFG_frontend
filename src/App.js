import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { apiLogout, checkToken } from './services/apiAuthService';
import { io } from "socket.io-client";
import { dologout } from './redux/action/userAction';
import { toast } from 'react-toastify';



const App = () => {

  const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
  const access_token = useSelector(state => state?.user?.account?.access_token);
  const refreshToken = useSelector(state => state?.user?.account?.refresh_token);
  const user = useSelector(state => state.user);
  const [dataUser, setDataUser] = useState('')

  const [reload, setReload] = useState(false)

  const socket = io("http://localhost:5000")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkRole = async (access_token) => {

    let res = await checkToken(access_token);
    if (res.status == 'error' && res.code == '401') {
      handleClickLogout()
      navigate('/login');
      setDataUser('')
    }
    setDataUser(res?.data)

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

  useEffect(() => {

    if (isAuthenticated === true) {
      checkRole(access_token)
    }
  }, [])


  useEffect(() => {
    if (isAuthenticated === true && socket) {
      socket.userId = user._id
      socket?.emit("newUser", user.email, user._id);
    }

  }, []);


  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header
          dataUser={dataUser}

        />
      </div>
      <div className='main-container mb-5'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet
            socket={socket}
          />
        </div>
      </div>
      <div className='footer-container mt-5'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
