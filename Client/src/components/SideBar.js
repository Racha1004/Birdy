
import React from "react";
import '../styles/SideBar.css'
import {FaHome,FaHashtag,FaBell,FaEnvelope,FaSearch,FaChevronDown} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import ListFollow from "./ListFollow";
import { Link } from "react-router-dom";

function SideBar(){

    return(
        <div className="sideBar">
            <div className="sideBarWrapper">
                <ul className="sidebarList">
                    
                    <li className= "sideBarListItems">
                        <Link to={`/` } className="LinkItems" > 
                            <FaHome className="sideBarIcon"/>
                            <span className="sideBarItemText">Acceuil</span>
                        </Link>

                    </li>
                    <li className= "sideBarListItems">
                        <Link to={`/` } className="LinkItems" > 

                        <FaHashtag className="sideBarIcon"/>
                        <span className="sideBarItemText">Tendances</span>
                        </Link>

                    </li>
                    <li className= "sideBarListItems">
                        <Link to={`/` } className="LinkItems" > 

                        <FaBell className="sideBarIcon"/>
                        <span className="sideBarItemText">Notifications</span>
                        </Link>

                    </li>
                    <li className= "sideBarListItems">
                        <Link to="/" className="LinkItems" > 

                        <FaSearch className="sideBarIcon"/>
                        <span className="sideBarItemText">Recherche</span>
                        </Link>

                    </li>
                    <li className= "sideBarListItems">
                        <Link to={`/` } className="LinkItems" > 

                        <FaEnvelope className="sideBarIcon"/>
                        <span className="sideBarItemText">Post</span>
                        </Link>

                    </li>
                    <li className= "sideBarListItems">
                        <Link to={`/profile/User1`}  className="LinkItems" > 

                        <CgProfile className="sideBarIcon"/>
                        <span className="sideBarItemText">Profil</span>
                        </Link>

                    </li>
                    
                </ul>
                <div className="Stat" >Les stat sont :        10  ,,  100</div>
            </div>
            <ListFollow nom = "Following"/>

        </div>
    );
}

export default SideBar ;