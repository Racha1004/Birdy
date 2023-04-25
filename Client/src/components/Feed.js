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
            const res = await axios.get("api/post/feed/all/64381cf84bedd92848ccf579");
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