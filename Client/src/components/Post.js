import React, { useState,useEffect, useContext } from "react";
import {AiOutlineHeart,AiFillHeart, AiOutlineCloudServer} from "react-icons/ai";
import {FaCheckCircle,FaRemoveFormat} from "react-icons/fa";
import  {RiDeleteBin6Line} from "react-icons/ri";
import "../styles/Post.css";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Post({post,posts,setposts}){
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
    const deleteHandeler = ()=>{
        try{
            axios.delete('/post/'+post._id);
            const updatedMessages = posts.filter(m => m._id !== post._id);
            setposts(updatedMessages);
        }catch(error){
            console.log("error");
        }
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
                <Link to ={`/profile/${user.pseudo}`} className="link-user-avatar" >
                    <h4>{user.pseudo}</h4>
                </Link>

                    <FaCheckCircle className="icon"/>
                    <span> {user?.email} . {format(post.createdAt)}</span>
                </div> 
                <p className="post-text">
                   {post?.message}
                </p>
               { post.picture && <img  className="post-img" src={ PF+post.picture} alt="" />}
                <div className="post-icons">
                    { user._id === currentUser._id && <div className="icon"  onClick={deleteHandeler}  ><RiDeleteBin6Line />Supprimer</div>}
                    <div className="icon" onClick={likeHandeler} >{isLiked?<AiFillHeart  />:<AiOutlineHeart />}{like}</div>
                </div>
            </div>
    </div>
    );
}

export default Post;
