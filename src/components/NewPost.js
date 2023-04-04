import React, { useContext,useRef, useState } from "react";
import {AiOutlineStar} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";

import bird from"./Images/bird.png";
import {FaImage,FaCamera,FaChartBar} from "react-icons/fa";
import "../styles/NewPost.css";
function NewPost({page}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //const {user}= useContext();
    const desc = useRef();
    const [file,setFile]=useState(null);

    const submitHandeler =(e)=>{
        e.preventDefault();
        const newPost = {
            userId:2
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
                    <img src={`${PF}bird.png`} alt=""/>
                </div>
                <textarea type="text" placeholder="What's happening ?" ref={desc}/>
                <label htmlFor="shareImg" className="icon" >
                    <FaCamera />
                    <input style={{display:"none"}}
                            type="file"
                            id="shareImg"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e)=>setFile(e.target.files[0])}
                            />
                </label>
                <FaImage className="icon" />
                <FaChartBar className="icon" />
                <button type="submit" className="postMessage">tak</button>
            </form>
        </div>
    );
}

export default NewPost ;