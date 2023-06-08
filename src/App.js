import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const App = () => {

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container mb-5'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet />
        </div>
      </div>
      <div className='footer-container mt-5'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
