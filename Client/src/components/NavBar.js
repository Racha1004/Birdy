import React, { useContext } from "react";
import { FaDove, FaHome, FaHashtag, FaBell, FaEnvelope, FaSearch, FaChevronDown } from "react-icons/fa";
import bird from "./Images/bird.png";
import "../styles/NavBar.css";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import axios from "axios";
import { useHistory } from "react-router";

function NavBar() {
  //const { user } = useContext(AuthContext);
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    try{
      await axios.get("/api/user/logout");
      dispatch({ type: "LOGOUT" });
      history.push("/register");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <nav className="feeds-nav">
      <div className="logo">
        <FaDove className="icon" />
      </div>
      <div className="flex">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input type="test" id="recherche" name="fname" placeholder="Recherche ..." className="search-bar-input" />
          <input id="contact" type="checkbox" value="checked" name="contact" className="checkBox" />
        </div>
        <div className="icons">
          <a href="#" className="active"><FaHome /></a>
          <a href=""><FaHashtag /></a>
          <a href=""><FaBell /></a>
          <a href=""><FaEnvelope /></a>
        </div>

        <div className="user">
          <div className="user-img-wrapper">
            <img src={bird} alt="" />
          </div>
          <a href="#" className="user-link">Racha dac</a>
          <FaChevronDown className="icon" />
        </div>
          <button className="logout-button" onClick={handleLogout}> 
          Log out
          </button>
      </div>
    </nav>
  );
}

export default NavBar;
