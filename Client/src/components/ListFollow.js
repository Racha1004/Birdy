import React, { useState,useEffect } from "react";
import Follow from "./Follow";
import "../styles/ListFollow.css";
import axios from "axios";

function ListFollow({nom,user}){
    const [friends,setFriends]=useState([]);
    useEffect (()=>{
        const fetchFriends = async ()=>{
            try{
                if(user._id != null){
                    let friendsList= [];
                    if( nom === "Followings"){
                        friendsList = await axios.get("/user/followings/"+user._id);
                    }else if( nom === "Followers" ){
                        friendsList  = await axios.get("/user/followers/"+user._id);
                    }else {
                        friendsList  = await axios.get("/user/AllUsers");
                        friendsList.data = friendsList.data.filter(utilisateur => !user.following.includes(utilisateur._id) && utilisateur._id != user._id);
                    }
                setFriends(friendsList.data);
                }
            }catch(error){
                console.log(error);
            } 
        };
        fetchFriends();
    },[user._id])
    return (
        <div className="wrapFriend">
            <h3 className="follow-heading"> {nom} </h3>
            <div className="friends">
                {
                friends.map((u)=>(
                    <Follow key={u._id} user={u} />
                ))}  
            </div>  

            <div className="follow-link">
					<a href="#" >Show more</a>
			</div>
            
        </div>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme class=roro il faut ecrire className=roro

export default ListFollow;

