import React from 'react';
import '../styles/Footer.css';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import {FaDove} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <span>© 2023 Birdy, Inc.</span>
          <FaDove/>
        </div>
        <div className="footer__right">
          <div className="footer__icons">
            <a href="https://twitter.com/">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
