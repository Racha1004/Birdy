

import { useState } from "react";
import "../styles/ProfileTop.css";


function ProfileTop(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followed,setFollowed]=useState(false);
    return(
        <div className="profileTop">
            <div className="profileCover">        
                <img className="profileCoverImg" src={`${PF}salade3.jpg`} alt=""/>
                <img className="profileUserImg" src={`${PF}salade3.jpg`} alt=""/>
            </div>   
            <div className="profileInfo">        
                <h4 className="profileInfoName"> Racha nad</h4>
                <span className="profileBio">Hello ! :zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz </span>
            </div>            
        </div>
    )

}
export default ProfileTop;