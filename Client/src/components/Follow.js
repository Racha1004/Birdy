import React from "react";
import "../styles/Follow.css";
import {Link} from "react-router-dom";

function Follow({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="follow-user">
            <div className="follow-user-img">
                <img src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"}/>
            </div>
            <div className="follow-user-info">
                <Link to ={`/profile/${user.pseudo}`} className="link_user_pseudo">
                    <h4>{user.pseudo}</h4>
                    <p>{user.email}</p>
                </Link>
            </div>
            <button type="button" className="follow-btn">Suivre</button>
        </div>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme className=roro il faut ecrire classNameName=roro

export default Follow;

