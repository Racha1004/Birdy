import React, { useState,useEffect, useContext } from "react";
import {AiOutlineHeart,AiFillHeart, AiOutlineCloudServer,AiOutlineComment,AiOutlineDelete} from "react-icons/ai";
import {FaCheckCircle,FaRemoveFormat,FaTrash } from "react-icons/fa";
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
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    let [comments, setComments] = useState([]);
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

    // useeffect pour mettre a jour les post 
    useEffect(() => {
        const fetchComments = async () => {
          const res = await axios.get(`/post/${post._id}`);
          setComments(res.data.comments);
        };
        fetchComments();
      }, [post._id]);
      
    

    
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
      
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.patch("/post/comment-post/" + post._id, {
            text: comment,
          });
          const newComment = {
            _id: res.data._id,
            text: comment,
            commenterPseudo: currentUser.pseudo,
            //timestamp: Date.now() - res.data.createdAt,
          };
          if (!Array.isArray(comments)) {
            comments = [];
          }
          setComments([...comments, newComment]);
          setComment("");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };

    const handleCommentClick = () => {
        setShowComments(!showComments); // Toggle the showComments state
    };
      
    const handleCommentDelete = async (commentId) => {
        try {
            if (Array.isArray(comments)) {
          const commentToDelete = comments.find((c) => c._id === commentId);
          if (commentToDelete) {
            console.log("post",post._id);
            console.log("com",commentToDelete._id)
            const res = await axios.patch("/post/delete-comment-post/"+post._id,
            {commentId : commentToDelete._id});
           
            setComments(res.data.comments);
            console.log("Comment deleted");
            window.location.reload();
          } else {
            console.log("Comment not found");
          }
        }
        } catch (error) {
          console.log(error);
        }
        
      };

      

      return (
        <div className="post">
          <div className="user-avatar">
            <Link to={`/profile/${user.pseudo}`} className="link-user-avatar">
              <img src={user.profilePicture ? PF + user.profilePicture : PF + "profil.png"} />
            </Link>
          </div>
          <div className="post-content">
            <div className="post-user-info">
              <Link to={`/profile/${user.pseudo}`} className="link-user-avatar">
                <h4>{user.pseudo}</h4>
              </Link>
    
              <FaCheckCircle className="icon" />
              <span> {user?.email} . {format(post.createdAt)}</span>
            </div>
            <p className="post-text">
              {post?.message}
            </p>
            <img className="post-img" src={PF + post.picture} alt="" />
            <div className="post-icons">
              {user._id === currentUser._id && <div className="icon" onClick={deleteHandeler}><RiDeleteBin6Line />Supprimer</div>}
              <div className="icon" onClick={likeHandeler}>{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}{like}</div>
              <div className="icon" onClick={handleCommentClick}><AiOutlineComment /></div>
            </div>
    
            {showComments && (
              <div className="post-comments">
                {comments.map((comment) => (
                  <div key={comment._id} className="post-comment">
                    <div className="comment-user-info">
                      <h4>{currentUser.pseudo}</h4>
                      <span> {} . {format(comment.timestamp)}</span>
                      <button className="delete-comment-btn" onClick={() => handleCommentDelete(comment._id)}>
                        <AiOutlineDelete />
                    </button>
                    </div>
                    <p className="comment-text">
                      {comment.text}
                    </p>
                  </div>
                ))}
                <form >
                  <input type="text" placeholder="Ajouter un commentaire" value={comment} onChange={(e) => setComment(e.target.value)} />
                  <button onClick = {handleCommentSubmit} type="submit">Poster</button>
                </form>
              </div>
            )}
    
          </div>
        </div>
      );
}
    
export default Post;
