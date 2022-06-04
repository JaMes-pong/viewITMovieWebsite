import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

// The navbar component.
function Navbar() {
    const navigate = useNavigate();

    // search handler
    function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        console.log('You clicked submit.' + data.get('keyword'));
        // search movie by keyword
        navigate(`/search/${data.get('keyword')}`);
        window.location.reload();
    }

    // handling user access to their profile
    function handleProfile(e) {
        e.preventDefault();
        let userID = user._id;
        let uname = user.username;
        console.log('You clicked profile.' + userID + " " + uname);
        navigate(`/profile/${userID}`);
        window.location.reload();

        // fetch user data from server
        async function fetchUser() {
            const response = await fetch('http://localhost:3001/login/profile', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: user._id, username: uname })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "User not found") {
                    alert("User not found");
                } else {
                    localStorage.setItem('user', JSON.stringify(data));
                }
            })
        }
        fetchUser();
    }
        

    // get logged in user from local storage
    const [user, setUser] = useState({});
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand" id="navh1"><FontAwesomeIcon icon={ faClapperboard } color="tomato"/>{' '}<span id="about_1">View IT</span></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <Link to="/about" class="nav-link">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/movieList" class="nav-link">Movie Database</Link>
                        </li>
                    </ul>
                    <div class="btn_login">
                        {
                            user.username ? (
                                <div>
                                    <form onSubmit={handleProfile}>
                                        <span class="username">Welcome back, {user.username}</span> &nbsp;
                                        <button class="btn btn-outline-success" type="submit">Profile</button> &nbsp;
                                        {/*<Link to="/profile" class="btn btn-outline-light">Profile</Link>{' '} */}
                                        <div class="vl"></div>
                                        <button class="btn btn-outline-danger" onClick={() => {
                                            localStorage.removeItem('user');
                                            setUser({});
                                            localStorage.removeItem('favmovie');
                                            alert('Logged out successfully');
                                            window.location.reload();
                                            window.location.href = "/";
                                        }}>Logout</button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/register" class="btn btn-outline-primary">Sign Up</Link> &nbsp;
                                    <Link to="/login" class="btn btn-outline-light">Login</Link>
                                </div>
                            )
                        }    
                    </div>
                    <form class="d-flex" onSubmit={handleSubmit}>
                        <div class="vl"></div>
                        <input class="form-control me-2" name="keyword" type="search" placeholder="Search" aria-label="Search" required/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;