import React, { useContext,useRef, useState } from "react";
import {AiOutlineStar} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";

import {FaImage,FaCamera,FaChartBar} from "react-icons/fa";
import "../styles/NewPost.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function NewPost({page}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile]=useState(null);
    const {user} = useContext(AuthContext);


    const submitHandeler = async(e)=>{
        e.preventDefault();
        const newPost = {
            posterId:user._id,
            message: desc.current.value
        }
        
        try{
            await axios.post("/post/", newPost);

        }catch(error){
            
        }
    }
    return(
        <div className="feeds-header" >
            <div className="header-top">
                <h4>{page}</h4>
                { page==="Home" && <AiOutlineStar className="icon"/>}
                { page==="Profil" && <CgProfile className="icon"/>}

            </div>

            <form className="header-post" onSubmit={submitHandeler}>
                <div className="header-img-wrapper">
                    <img src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"} alt=""/>
                </div>
                <textarea type="text" placeholder={"What's happening "+user.pseudo+" ?"} ref={desc}/>
                <label htmlFor="shareImg" className="icon" >
                    <FaImage />
                    <input style={{display:"none"}}
                            type="file"
                            id="shareImg"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e)=>setFile(e.target.files[0])}
                            />
                </label>
                <FaChartBar className="icon" />
                <button type="submit" className="postMessage">Share</button>
            </form>
        </div>
    );
}

export default NewPost ;