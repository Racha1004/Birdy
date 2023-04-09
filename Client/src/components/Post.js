import React, { useState,useEffect, useContext } from "react";
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import {FaCheckCircle,FaRegComment} from "react-icons/fa";
import "../styles/Post.css";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
function Post({post}){
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] =useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //const {user:currentUser} = useContext();
    useEffect (()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`api/users/${post.userId}`)
            setUser(res.data);
            console.log("here"+user.profilePicture);
        };
        fetchUser();
    },[post.userId])
    /*
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser.userid))
    })
    */
    const likeHandeler = ()=>{
        //ajouter ce like a la base de données
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }
    return(
        <div className="post">
            <div className="user-avatar">
                <Link to ={`profil/${user.pseudo}`} className="link-user-avatar" >
                  <img src={user.profilePicture || PF + "profil.png"} />
                </Link>
            </div>
            <div className="post-content">
                <div className="post-user-info">
                    <h4>{user.pseudo}</h4>
                    <FaCheckCircle className="icon"/>
                    <span> @hahaha . {format(post.createdAt)}</span>
                </div> 
                <p className="post-text">
                   {post?.description}
                </p>
                <div className="post-img">
                    <img src={PF+post.image} alt="post"/>
                </div>
                <div className="post-icons">
                    <div className="icon"  ><FaRegComment /> {post.comment}</div>
                    <div className="icon" onClick={likeHandeler} >{isLiked?<AiFillHeart  />:<AiOutlineHeart />}{like}</div>
                </div>
            </div>
    </div>
    );
}

export default Post;