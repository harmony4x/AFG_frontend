import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque, magna vel consequat viverra, sem libero cursus mauris, in ultricies turpis elit nec sapien.</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3>Contact Us</h3>
            <ul className="contact-list">
              <li><i className="fa fa-map-marker"></i>123 Main Street, City, Country</li>
              <li><i className="fa fa-phone"></i>+123 456 7890</li>
              <li><i className="fa fa-envelope"></i>info@example.com</li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-instagram"></i></a>
              <a href="#"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
