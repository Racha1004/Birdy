import React from "react";

function TweetBox(){
    return(
        <div class="feeds-header" >
            <div class="header-top">
                <h4>Home</h4>
                <i class="far fa-star"></i>
            </div>

            <div class="header-post">
                <div class="header-img-wrapper">
                    <img src="Images/bird.png" alt=""/>
                </div>
                <input type="text" placeholder="What's happening ?"/>
                <i class="far fa-image"></i>
                <i class="fas fa-camera"></i>
                <i class="far fa-chart-bar"></i>
            </div>
        </div>
    );
}

export default TweetBox ;