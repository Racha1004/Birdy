
import React, {useContext } from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";
import { AuthContext } from "../context/AuthContext";

function Home(){
    const { user } = useContext(AuthContext);

    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="flexContent">
                <SideBar user={user}/>
                <Feed page="Home"/>
                <div className="rightBar">
                    <ListFollow nom="To follow" user={user}/>
                </div>
            </div>
            
            <footer className="footer">Footer</footer>
        </section>
    );
}

export default Home ;

/*
<ListPosts/> => on remplace avec ça les post 

*/
