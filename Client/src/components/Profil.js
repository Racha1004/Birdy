
import React,{useState,useEffect,useContext} from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Profil.css'
import ProfileTop from "./ProfileTop";
import UserInfo from "./UserInfo";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";
import axios from "axios";
import Footer from "./Footer";
import { AuthContext } from "../context/AuthContext";

function Profil(){

    const [user,setUser] =useState({});
    const username = useParams().username;
    const [maChaine, setMaChaine] = useState("");
    const {user:currentUser} = useContext(AuthContext);

    useEffect (()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?username=${username}`);
            const newInfos = {
                profileViews : (res.data.profileViews+1)
            };
            console.log(res.data);
            if(currentUser._id !== res.data._id) {
                await axios.put("/user/profileViews/"+res.data._id, newInfos);
            }
            setUser(res.data)

        };
        fetchUser();
       
    },[username])

    return(
        <section className="feeds-page">
            <NavBar setMaChaine={setMaChaine} page="profile"/>
            <div className="profile">
                <SideBar user={user} />
                <div className="profile-content">
                    <ProfileTop user={user} />  
                    <div className="flex" >
                        <Feed page="Profile"searchInput={maChaine} username={username}/>
                        <div className="rightBar">
                            <UserInfo user={user}/>
                            <ListFollow nom ="Followers" user={user} />
                        </div>
                    </div>
                
                </div>
            </div>
            
            <Footer />
        </section>
    );
}

export default Profil ;

/*
<ListPosts/> => on remplace avec ça les post 

*/
