import React, { useState } from "react";
import Follow from "./Follow";
import "../styles/ListFollow.css";
function ListFollow({nom,css}){
    const [friends,setFriends]=useState([]);
    useEffect (()=>{
        /*const fetchFriends = async ()=>{
            const res = await axios.get("posts/timeline/idUser")
            setFriends(res.data)
        };
        fetchPosts();*/
    },[])
    return (
        <div className={`follow${css}`}>
            <h3 className="follow-heading"> {nom} </h3>
            <Follow/>
            <Follow/>
            <Follow/>
            <Follow/>
            {/*friends.map((u)=>(
                 <Follow key={u.id} user={u} />
            ))*/}  
            <div class="follow-link">
					<a href="#" >Show more</a>
			</div>
            <footer class="follow-footer">
                <ul>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookieq</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">More</a></li>

                </ul>
            </footer>
        </div>
    )
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme class=roro il faut ecrire className=roro

export default ListFollow;

