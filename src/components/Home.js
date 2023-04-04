
import React from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import {Users} from "../Data/Users.js";
import Follow from "./Follow";
import SideBar from "./SideBar";

function Home(){

    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="flexContent">
                <SideBar />
                <Feed page="Home"/>
                <div className="wrapFriend">
                    <div className="friends">
                        {Users.map((u)=>(
                            <Follow key={u.id} user={u} />
                        ))}  
                    </div>
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
