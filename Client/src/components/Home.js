import React, { useState } from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import {Users} from "../Data/Users.js";
import Follow from "./Follow";
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";

function Home(){
  const [maChaine, setMaChaine] = useState("");

  return(
    <section className="feeds-page">
      <NavBar setMaChaine={setMaChaine} />
      console.log(setMaChaine)
      <div className="flexContent">
        <SideBar />
        <Feed page="Home" searchInput={maChaine} />
        <div className="rightBar">
          <ListFollow nom="To follow" />
        </div>
      </div>
      
      <footer className="footer">Footer</footer>
    </section>
  );
}

export default Home;
