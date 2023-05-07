import React, { useEffect,useState,useContext } from "react";

import Post from "./Post";
import NewPost from "./NewPost";

import "../styles/Feed.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Feed({ page, username ,searchInput, isChecked,isCheckedPseudo}) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  //POur chercher les posts dun user
  const { user } = useContext(AuthContext);
   
  // effect to filter posts based on searchInput
useEffect(() => {
    const fetchPosts = async () => {
      if (searchInput !== "") {
        username = "david" // // je l ai mis en statique pour qu il soit pas undefined, apres tous les users auront le leur
        const res = isChecked === true
        ? await axios.get("/post/feed/all/search/"+ user._id+`/${searchInput}`) // recherche base sur sur les messages de mes amis
        : page === "Profile"//username
          ? await axios.get("/post/profile/search/" +user.pseudo+ `/${searchInput}`) // recherche base sur sur les messages de mon profil
         : isCheckedPseudo === true 
          ? await axios.get(`/post/feed/search/${searchInput}`)
          : await axios.get(`/post/search/${searchInput}`); // recherche base sur sur les messages de tous les utilisateurs  
        console.log("res",res.data)
        setFilteredPosts(res.data.sort((p1,p2)=>{
           return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
        
      } else {
        const res = username && isChecked === true
        ? await axios.get("/post/feed/all/"+ user._id)
        : isCheckedPseudo === true
          ? await axios.get("/post/feed/all/"+ user._id)
        : page === "Profile" 
          ? await axios.get("/post/profile/" + username)
          : await axios.get("/post/feed/all/"+ user._id)
        setFilteredPosts(res.data.sort((p1,p2)=>{
           return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));

      }
    };
    fetchPosts();
  }, [searchInput,isChecked,isCheckedPseudo,username, user._id]);
  

  return (
    <div className="feeds-content">
      {(! username || username === user.pseudo) && <NewPost page={page} /> }
      <div className="posts">
        {filteredPosts.map((p) => (
          console.log(p),
          <Post key={p._id} post={p} posts={filteredPosts} setposts={setFilteredPosts} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
