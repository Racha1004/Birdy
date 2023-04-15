

import "../styles/UserInfo.css";


function UserInfo({user}){
    return(
        <div className="rightBarInfo">
            <h4 className="rightBarTitle">User's Infos :</h4>
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">Pseudo :</span>
                <span className="rightBarInfoValue">{user.pseudo}</span>
            </div>                             
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">Following :</span>
                <span className="rightBarInfoValue">{user.following? user.following.length : "0"}</span>
            </div>                      
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">Followers :</span>
                <span className="rightBarInfoValue">{user.followers? user.followers.length:"0"}</span>
            </div>                                                    
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">Activité :</span>
                <span className="rightBarInfoValue">{user.likes ?user.likes.length : "0"}</span>
            </div> 
        </div>
    )

}
export default UserInfo;