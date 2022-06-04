import React from "react";

// about component
function About() {
    // about pages
    return(
        <div class="container">
            <h1 id="about">About</h1>
            <hr></hr>
            <div class="row">
                <div class="col">
                    <div class="logo_about">
                        <h1>View IT</h1>
                        <p>Watch'em ALL!</p>
                    </div>
                </div>
            </div>
            <p> DIT 5404 - Final Assignment: Movie Listing Website</p>
            <p> 
                <span id="about_1">View It</span> is develop by: <br></br>
                Student: Chan Wai Pong James<br></br>
                Student ID: 180609303
            </p>
            <p> Youtube Link: <a class="btn btn-light" href="https://youtu.be/wmWZsc9J9yU" target="_blank">Go</a></p> 
            <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Login Username and Password
                </button>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card bg-dark">
                    <p>Username: james</p>
                    <p>Password: 180609303</p>
                </div>
            </div>
        </div>
    );
}

export default About;	
