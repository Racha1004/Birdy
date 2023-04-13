
import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Profil.css'
import ProfileTop from "./ProfileTop";
import UserInfo from "./UserInfo";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";
function Profil(){

    const [user,setUser] =useState({});
    /*const username = useParams().username;
    useEffect (()=>{
        /*const fetchUser = async ()=>{
            const res = await axios.get(`users?username=${username}`);
            setUser(res.data)
        };
        fetchUser();*/
   /* },[])*/
    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="profile">
                <SideBar />
                <div className="profile-content">
                    <ProfileTop />  
                    <div className="flex" >
                        <Feed page="Profile"/>
                        <div className="rightBar">
                            <UserInfo user={user}/>
                            <ListFollow nom ="Followers"/>
                        </div>
                    </div>
                
                </div>
            </div>
            <footer className="RACYA" >HETE</footer>
        </section>
    );
}

export default Profil ;

/*
<ListPosts/> => on remplace avec ça les post 

*/
