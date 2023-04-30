

import "../styles/UserInfo.css";
import { AuthContext } from "../context/AuthContext";
import React, {useContext, useEffect, useState } from "react";
import { CgAddR, CgRemoveR } from "react-icons/cg";
import axios from "axios";

function UserInfo({user}){
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState( currentUser.following.includes(user._id));
    useEffect (()=>{
        setFollowed( currentUser.following.includes(user._id));
    },[currentUser, user]);
    const followHandeler = async()=>{
        try{
            /*router.patch("/follow/:id", userController.follow);
                router.patch("/unfollow/:id", userController.unfollow); */
            console.log("him:  -"+ user._id+"-");
            console.log("me:  -"+ currentUser._id+"-"+currentUser.following.includes(user._id));
            console.log(currentUser);
            if(followed){
                console.log("unfolow");
                await axios.patch("/user/unfollow/"+currentUser._id,{idToUnFollow :user._id });
                dispatch({type:"UNFOLLOW",payload : user._id});
            }else{
                console.log("follow");
                await axios.patch("/user/follow/"+currentUser._id,{idToFollow :user._id });
                dispatch({type:"FOLLOW",payload : user._id});

            }
        }catch(error){
            console.log(error);
        }
        setFollowed(!followed);
    }
    return(
        <div className="rightBarInfo">
            { user.pseudo !== currentUser.pseudo && <button type="submit" className="follow-user_button" onClick={followHandeler}>
                {followed ? " Se désabonner " : " S'abonner' "} 
                {followed ? <CgRemoveR/>: <CgAddR/>} 
             </button>}
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