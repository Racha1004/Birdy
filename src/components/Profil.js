
import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import NewPost from "./NewPost";
import Feed from "./Feed";
import '../styles/Profil.css'
import salade from "./Images/salade3.jpg"
import Follow from "./Follow";
import ProfileTop from "./ProfileTop";
import UserInfo from "./UserInfo";
import {Users} from "../Data/Users.js";
import { useParams } from "react-router-dom";
function Profil(){

    const [user,setUser] =useState({});
    const username = useParams().username;
    useEffect (()=>{
        /*const fetchUser = async ()=>{
            const res = await axios.get(`users?username=${username}`);
            setUser(res.data)
        };
        fetchUser();*/
    },[])
    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="profile">
                <ProfileTop />  
                <div className="flex" >
                    <Feed page="Profile"/>
                    <div className="sideBar">
                        <UserInfo user={user}/>
                        <div className="friends">
                        {Users.map((u)=>(
                            <Follow key={u.id} user={u} />
                        ))}  
                        </div>
                    </div>
                </div>
               
            </div>
        </section>
    );
}

export default Profil ;

/*
<ListPosts/> => on remplace avec ça les post 

*/
