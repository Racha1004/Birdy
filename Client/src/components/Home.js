
import React, {useContext,useState } from "react";
import NavBar from "./NavBar";
import Feed from "./Feed";
import '../styles/Home.css'
import SideBar from "./SideBar";
import ListFollow from "./ListFollow";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";

function Home(){
  const { user } = useContext(AuthContext);

  const [maChaine, setMaChaine] = useState("");
  const [monBooleen, setMonBooleen] = useState(false);
  const [monBooleen2, setMonBooleen2] = useState(false);

  return(
    <section className="feeds-page">
      <NavBar setMaChaine={setMaChaine} setIsChecked={monBooleen => setMonBooleen(monBooleen)} setIsCheckedPseudo={monBooleen2 =>setMonBooleen2(monBooleen2)} page="home" />
      <div className="flexContent">
        <SideBar user={user} />
        <Feed page="Home" searchInput={maChaine} isChecked={monBooleen} isCheckedPseudo={monBooleen2}/>
        <div className="rightBar">
          <ListFollow nom="To follow"  user={user} />
        </div>
      </div>
      
      <Footer/>
    </section>
  );
}

export default Home;
