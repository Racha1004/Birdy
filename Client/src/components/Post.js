import React, { useState,useEffect, useContext } from "react";
import {AiOutlineHeart,AiFillHeart, AiOutlineCloudServer} from "react-icons/ai";
import {FaCheckCircle,FaRegComment} from "react-icons/fa";
import "../styles/Post.css";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Post({post}){
    const [like,setLike] = useState(post.likers.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] =useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect (()=>{
        setIsLiked(post.likers.includes(currentUser._id));
    },[post.likers,currentUser._id]);

    useEffect (()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?userId=${post.posterId}`)
            setUser(res.data);
        };
        fetchUser();
    },[post.userId]);
   
    
    const likeHandeler = ()=>{
        //ajouter ce like a la base de données
        try{
            axios.patch('/post/'+post._id+'/like',{id :currentUser._id });
        }catch(error){
            console.log("error");
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }
    return(
        <div className="post">
            <div className="user-avatar">
                <Link to ={`/profile/${user.pseudo}`} className="link-user-avatar" >
                  <img src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"} />
                </Link>
            </div>
            <div className="post-content">
                <div className="post-user-info">
                    <h4>{user.pseudo}</h4>
                    <FaCheckCircle className="icon"/>
                    <span> @hahaha . {format(post.createdAt)}</span>
                </div> 
                <p className="post-text">
                   {post?.message}
                </p>
                <img  className="post-img" src={PF+post.picture} alt="" />
                <div className="post-icons">
                    <div className="icon"  ><FaRegComment /> {post.comment}</div>
                    <div className="icon" onClick={likeHandeler} >{isLiked?<AiFillHeart  />:<AiOutlineHeart />}{like}</div>
                </div>
            </div>
    </div>
    );
}

export default Post;