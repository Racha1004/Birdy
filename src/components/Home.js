
import React from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import {Users} from "../Data/Users.js";
import Follow from "./Follow";


function Home(){

    return(
        <section className="feeds-page">
            <NavBar/>
            <div className="flexContent">
                <Feed page="Home"/>
                <div className="wrapFriend">
                    <div className="friends">
                        {Users.map((u)=>(
                            <Follow key={u.id} user={u} />
                        ))}  
                    </div>
                </div>
            </div>
            
            
        </section>
    );
}

export default Home ;

/*
<ListPosts/> => on remplace avec ça les post 

*/
