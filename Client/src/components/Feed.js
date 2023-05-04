
import React, { useEffect, useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";

import "../styles/Feed.css";
import axios from "axios";

function Feed({ page, username ,searchInput, isChecked}) {
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
        username = "david"  // // je l ai mis en statique pour qu ikl soit pas undefined, apres tous les users auront le
        const res = username && isChecked === true
        ? await axios.get(`/post/feed/all/search/643fc7a342de0261bebc476f/${searchInput}`) // recherche base sur sur les messages de mes amis
        : username 
          ? await axios.get("/post/profile/search/" + `david/${searchInput}`) // recherche base sur sur les messages de mon profil
          : await axios.get(`/post/search/${searchInput}` ); // recherche base sur sur les messages de tous les utilisateurs  
        console.log("res",res.data)
        setFilteredPosts(res.data);

        //setPosts(res.data);
        //setFilteredPosts(postResponse.data);
      } else {
        const res = username && isChecked === true
        ? await axios.get("/post/feed/all/643fc7a342de0261bebc476f")
        : username 
          ? await axios.get("/post/profile/" + "david")
          : await axios.get("/post/timeline/643fc7a342de0261bebc476f");
        
        //setPosts(res.data);
        setFilteredPosts(res.data);

      }
    };
    fetchPosts();
  }, [searchInput,isChecked]);
  

  return (
    <div className="feeds-content">
      <NewPost page={page} />
      <div className="posts">
        {filteredPosts.map((p) => (
          console.log(p),
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
