
import React from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import {Users} from "../Data/Users.js";
import Follow from "./Follow";
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";

function Home(){

    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="flexContent">
                <SideBar />
                <Feed page="Home"/>
                <div className="rightBar">
                    <ListFollow nom="To follow" />
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
