import React, { useEffect,useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import "../styles/Feed.css";
import axios from "axios";
function Feed({page}){
    const [posts,setPosts] = useState([]);
    //POur chercher les posts dun user
    //const {user}= useContext()
    useEffect (()=>{
        const fetchPosts = async ()=>{
            const res = await axios.get("api/posts/feed/all/64329f94bfe753e2b099de7f");
            setPosts(res.data);
            console.log(posts);
        };
        fetchPosts();
    },[])
    return (
        <div className="feeds-content">
            <NewPost page={page} />
            <div className="posts">
                
                {posts.map((p)=>(
                    <Post key={p._id} post={p} />
                ))}  
            </div>
        </div> 
    )
}

export default Feed;