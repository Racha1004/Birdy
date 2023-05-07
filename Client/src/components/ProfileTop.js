

import { useState, useContext } from "react";
import "../styles/ProfileTop.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


function ProfileTop({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followed,setFollowed]=useState(false);
    const [fileCover,setFileCover]=useState(null);
    const [fileProfile,setFileProfile]=useState(null);
    const {user:currentUser, dispatch} = useContext(AuthContext);

    const submitHandeler = async(e)=>{
        e.preventDefault();
        const newInfos = {
            profilePicture :"",
            coverPicture:"",
            bio:""
        }
        if(fileCover){//On ajoute notre image
            const data = new FormData();
            const fileName = Date.now()+fileCover.name;
            data.append("name",fileName);
            data.append("file",fileCover);
            newInfos.coverPicture = fileName;
            try{
                await axios.post("/upload", data);
            }catch(error){
                console.log(error);
            }
        }
        if(fileProfile){//On ajoute notre image
            const data = new FormData();
            const fileName = Date.now()+fileProfile.name;
            data.append("name",fileName);
            data.append("file",fileProfile);
            newInfos.profilePicture = fileName;
            try{
                await axios.post("/upload", data);
            }catch(error){
                console.log(error);
            }
        }
        // Ensuite on le poste !
        try{
            await axios.put("/user/"+currentUser._id, newInfos);
            const res = await axios.get("/user?username="+currentUser.pseudo);
            dispatch({ type: "PHOTO_CHANGE", payload: res.data });

            window.location.reload();
        }catch(error){
            
        }
    }
    return(
        <div className="profileTop">
            <form className="update-user" onSubmit={submitHandeler}>

                <div className="profileCover"> 
                    <label htmlFor="coverImgChange">    
                        <img className="profileCoverImg" src={user.coverPicture? PF + user.coverPicture : PF + "noCover.jpg"} alt=""/>
                        <input style={{display:"none"}}
                                type="file"
                                id="coverImgChange"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e)=>{setFileCover(e.target.files[0])}}
                                />
                    </label>   
                    <label htmlFor="profileImgChange">
                        <img className="profileUserImg" src={user.profilePicture? PF + user.profilePicture : PF + "profil.png"} alt=""/>
                        <input style={{display:"none"}}
                                type="file"
                                id="profileImgChange"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e)=>{setFileProfile(e.target.files[0])}}
                                />
                    </label>
                </div>   
                <div className="profileInfo">        
                    <h4 className="profileInfoName">{user.pseudo}</h4>
                    <span className="profileBio">{user.bio}</span>
                    { user._id === currentUser._id &&<button type="submit" className="update-button">Modifier</button>}

                </div>     

            </form>       
        </div>
    )

}
export default ProfileTop;