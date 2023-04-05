import React from "react";
import bird from"./Images/bird.png"
import "../styles/Follow.css";

function Follow({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="follow-user">
            <div className="follow-user-img">
                <img src={PF+user.profilePicture}/>
            </div>
            <div className="follow-user-info">
                <h4>{user.username}</h4>
                <p>@annasmith</p>
            </div>
            <button type="button" className="follow-btn">Suivre</button>
        </div>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme className=roro il faut ecrire classNameName=roro

export default Follow;

