import React,{useContext,useState,useEffect} from "react";
import "../styles/Follow.css";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Follow({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user:currentUser,dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState( currentUser.following.includes(user._id));
    
    useEffect (()=>{
        setFollowed( currentUser.following.includes(user._id));
    },[currentUser, user]);

    const followHandeler = async()=>{
        try{
            if(followed){
                await axios.patch("/user/unfollow/"+currentUser._id,{idToUnFollow :user._id });
                dispatch({type:"UNFOLLOW",payload : user._id});
            }else{
                await axios.patch("/user/follow/"+currentUser._id,{idToFollow :user._id });
                dispatch({type:"FOLLOW",payload : user._id});

            }
        }catch(error){
            console.log(error);
        }
        setFollowed(!followed);
    }
    return (
        <div className="follow-user">
            <div className="follow-user-img">
                <Link to ={`/profile/${user.pseudo}`} className="link_user_pseudo">
                    <img src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"}/>

                </Link>
            </div>
            <div className="follow-user-info">
                <Link to ={`/profile/${user.pseudo}`} className="link_user_pseudo">
                    <h4>{user.pseudo}</h4>
                    <p>{user.email}</p>
                </Link>
            </div>
            { user.pseudo !== currentUser.pseudo && <button type="submit" className="follow-btn" onClick={followHandeler}>
                {followed ? " Retirer " : " Suivre"} 
             </button>}
        </div>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme className=roro il faut ecrire classNameName=roro

export default Follow;

