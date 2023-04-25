import React, { useContext } from "react";
import {FaDove,FaHome,FaHashtag,FaBell,FaEnvelope,FaSearch,FaChevronDown} from "react-icons/fa";
import bird from"./Images/bird.png"
import "../styles/NavBar.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import axios from "axios";
import { useHistory } from "react-router";

function NavBar(){
    //const {user} = useContext()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async (e) => {
      e.preventDefault();
      try{
        await axios.get("/user/logout");
        dispatch({ type: "LOGOUT" });
        history.push("/register");
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <nav className="feeds-nav">
            <Link to={`/`} className="logo" >
                <FaDove className="icon"/>
                <div className="nomSite">Birdy</div>
            </Link>
            <div className="content-navBar">
                 <div className="search-bar" id="search">
                    <FaSearch className="icon"/>
                    <input type="test" id="recherche" name="fname" placeholder="Recherche ..."  className="search-bar-input"/>
                    <input  id="contact" type="checkbox" value="checked" name="contact" className="checkBox"/>
                </div>
                <div className="icons">
                    <Link to={`/`} className="active" > <FaHome/></Link>
                    <a href="" ><FaHashtag/></a>
                    <a href="" ><FaBell/></a>
                    <a href="" ><FaEnvelope/></a>
                </div>  
                <button className="logout-button" onClick={handleLogout}> 
                  Log out
                </button>
                <Link to={`/profile/jj`} className="user" >
                    <div className="user-img-wrapper">
                        <img src={bird} alt=""/> 
                    </div>
                    <a href="#" className="user-link">Racha dac</a>
                    <FaChevronDown  className="icon"/>
                </Link>
            </div>
        </nav>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme class=roro il faut ecrire className=roro

export default NavBar;

