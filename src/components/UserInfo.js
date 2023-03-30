

import "../styles/UserInfo.css";


function UserInfo({user}){

    return(
        <div className="rightBarInfo">
            <h4 className="rightBarTitle">User's Infos :</h4>
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City :</span>
                <span className="rightBarInfoValue">New York</span>
            </div>                             
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">From :</span>
                <span className="rightBarInfoValue">York</span>
            </div>                      
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City :</span>
                <span className="rightBarInfoValue">New York</span>
            </div>                             
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City :</span>
                <span className="rightBarInfoValue">New York</span>
            </div>                             
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City :</span>
                <span className="rightBarInfoValue">New York</span>
            </div> 
        </div>
    )

}
export default UserInfo;