import React, { useContext } from "react";
import {FaDove,FaHome,FaHashtag,FaBell,FaEnvelope,FaSearch,FaChevronDown} from "react-icons/fa";
import bird from"./Images/bird.png"
import "../styles/NavBar.css"
import { Link } from "react-router-dom";
function NavBar(){
    //const {user} = useContext()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <nav className="feeds-nav">
            <Link to={`/`} className="logo" >
                <FaDove className="icon"/>
                <div className="nomSite">Birdy</div>
            </Link>
            <div className="flex">
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

/*
    import Login from "./Login"
    import Logout from "./Logout"

    <nav>
        { props.isConnect ? <Logout logout = {props.logout} /> :<Login  login = {props.login} /> }

    </nav>
*/