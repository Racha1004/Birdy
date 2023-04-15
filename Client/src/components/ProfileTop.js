

import { useState } from "react";
import "../styles/ProfileTop.css";


function ProfileTop({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followed,setFollowed]=useState(false);
    return(
        <div className="profileTop">
            <div className="profileCover">        
                <img className="profileCoverImg" src={user.coverPicture? PF + user.coverPicture : PF + "noCover.jpg"} alt=""/>
                <img className="profileUserImg" src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"} alt=""/>
            </div>   
            <div className="profileInfo">        
                <h4 className="profileInfoName">{user.pseudo}</h4>
                <span className="profileBio">{user.bio}</span>
            </div>            
        </div>
    )

}
export default ProfileTop;