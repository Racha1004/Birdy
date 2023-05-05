import React, { useEffect,useState,useContext } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import "../styles/Feed.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Feed({page, username}){
    const [posts,setPosts] = useState([]);
    //POur chercher les posts dun user
    const { user } = useContext(AuthContext);
    useEffect (()=>{
        const fetchPosts = async ()=>{
            const res = username 
                ? await axios.get("/post/profile/" + username) 
                : await axios.get("/post/feed/all/"+ user._id);
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPosts();
        console.log(posts);

    },[username, user._id])
    return (
        <div className="feeds-content">
            {(! username || username === user.pseudo) && <NewPost page={page} /> }
            <div className="posts">
                
                {posts.map((p)=>(
                    <Post key={p._id} post={p} posts = {posts} setposts={setPosts}/>
                ))}  
            </div>
        </div> 
    )
}

export default Feed;