import React, { useEffect, useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";

import "../styles/Feed.css";
import axios from "axios";

function Feed({ page, username ,searchInput}) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // POour chercher les posts dun user
  //const {user}= useContext()
  /*useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/feed/all/643fc7a342de0261bebc476f");
      setPosts(res.data);
      setFilteredPosts(res.data);
    };
    fetchPosts();
  }, [username]);*/

   // effect to filter posts based on searchInput
useEffect(() => {
    const fetchPosts = async () => {
      if (searchInput !== "") {
        const response = await axios.get(`/post/search/${searchInput}`);
        console.log(response.data);
        setPosts(response.data);
        setFilteredPosts(response.data);
      } else {
        //setPosts(data);
        setFilteredPosts(posts);
      }
    };
    fetchPosts();
  }, [searchInput]);
  

  return (
    <div className="feeds-content">
      <NewPost page={page} />
      <div className="posts">
        {filteredPosts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
