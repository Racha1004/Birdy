import React, { useState,useEffect, useContext } from "react";
import bird from "./Images/bird.png";
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import {FaCheckCircle,FaRegComment} from "react-icons/fa";
import {Users} from "../Data/Users.js"; //=> APRES FAUT LE SUUPIMER
import "../styles/Post.css";

function Post({post}){
    const [like,setLike] = useState(post.like);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] =useState({});
    //const {user:currentUser} = useContext();
    useEffect (()=>{
        /*const fetchUser = async ()=>{
            const res = await axios.get(`users/${post.userId}`)
            setUser(res.data)
        };
        fetchPosts();*/
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
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="post">
            <div className="user-avatar">
            <img src={PF+Users.filter((u)=> u.id === post?.userId)[0].profilePicture}/>
            {/*<img src={user.profilePicture || PF+"profil.PNG" }/>*/}
            </div>
            <div className="post-content">
                <div className="post-user-info">
                    <h4>{Users.filter((u)=> u.id === post?.userId)[0].username}</h4>
                    <FaCheckCircle className="icon"/>
                    <span> @hahaha . {post?.date}</span>
                </div>
                <p className="post-text">
                   {post?.desc}
                </p>
                <div className="post-img">
                    <img src={PF+post.photo} alt="post"/>
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