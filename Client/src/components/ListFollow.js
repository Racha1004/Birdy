import React, { useState,useEffect } from "react";
import Follow from "./Follow";
import {Users} from "../Data/Users.js";
import "../styles/ListFollow.css";
function ListFollow({nom}){
    const [friends,setFriends]=useState([]);
    useEffect (()=>{
        /*const fetchFriends = async ()=>{
            const res = await axios.get("posts/timeline/idUser")
            setFriends(res.data)
        };
        fetchPosts();*/
    },[])
    return (
        <div className="wrapFriend">
            <h3 className="follow-heading"> {nom} </h3>
            <div className="friends">
                {Users.map((u)=>(
                    <Follow key={u.id} user={u} />
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

