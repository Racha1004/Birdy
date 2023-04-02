
import React from "react";
import '../styles/SideBar.css'
import {FaHome,FaHashtag,FaBell,FaEnvelope,FaSearch,FaChevronDown} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";


function SideBar(){

    return(
        <div className="sideBar">
            <div className="sideBarWrapper">
                <ul className="sidebarList">
                    <li className= "sideBarListItems">
                        <FaHome className="sideBarIcon"/>
                        <span className="sideBarItemText">Acceuil</span>
                    </li>
                    <li className= "sideBarListItems">
                        <FaHashtag className="sideBarIcon"/>
                        <span className="sideBarItemText">Tendances</span>
                    </li>
                    <li className= "sideBarListItems">
                        <FaBell className="sideBarIcon"/>
                        <span className="sideBarItemText">Notifications</span>
                    </li>
                    <li className= "sideBarListItems">
                        <FaSearch className="sideBarIcon"/>
                        <span className="sideBarItemText">Recherche</span>
                    </li>
                    <li className= "sideBarListItems">
                        <FaEnvelope className="sideBarIcon"/>
                        <span className="sideBarItemText">Post</span>
                    </li>
                    <li className= "sideBarListItems">
                        <CgProfile className="sideBarIcon"/>
                        <span className="sideBarItemText">Profil</span>
                    </li>
                </ul>
                
            </div>
        </div>
    );
}

export default SideBar ;