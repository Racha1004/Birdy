import React, { useEffect,useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import "../styles/Feed.css";
import {Posts} from "../Data/Posts.js";
function Feed({page}){
    const [posts,setPosts] = useState([]);
    //POur chercher les posts dun user
    //const {user}= useContext()
    useEffect (()=>{
        /*const fetchPosts = async ()=>{
            const res = await axios.get("posts/timeline/idUser")
            setPosts(res.data)
        };
        fetchPosts();*/
    },[])
    return (
        <div className="feeds-content">
            <NewPost page={page} />
            <div className="posts">
                
                {Posts.map((p)=>(
                    <Post key={p.id} post={p} />
                ))}  
            </div>
        </div> 
    )
}

export default Feed;