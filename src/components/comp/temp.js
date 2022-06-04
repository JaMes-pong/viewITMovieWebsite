import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UserImg from "../images/user.png";

function UserProfile() {
    const [user, setUser] = useState({});
        useEffect(() => {
            const user = localStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user));
            }
        }, []);

    // delete favMovie and refresh local storage
    function deleteHandler(e) {
        e.preventDefault();
        let uid = user.userID;
        let uname = user.username;
        let data = new FormData(e.target);
        let deleteID = data.get('movieID');
        console.log('You clicked delete.' + deleteID + " " + uid);

        // delete favourite movie
        fetch('http://localhost:3001/login/removefav', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, movieID: deleteID })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Not in favorite") {
                    alert("Not in favorite, cannot delete");
                } else {
                    alert("Movie removed from favorites");
                    window.location.reload();
                }
            })
        
        // refresh localstorage
        fetch('http://localhost:3001/login/profile', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, username: uname })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "User not found") {
                    alert("User not found");
                } else {
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.href = "/profile";
                }
            })      
    }

    // refresh localstorage function
    function refresh(e) {
        //e.preventDefault();
            let uid = user.userID;
            let uname = user.username;
            fetch('http://localhost:3001/login/profile', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, username: uname })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "User not found") {
                    alert("User not found");
                } else {
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.href = "/profile";
                }
            })
    }

    return(
        <div class="container">
            <div class="row" id="profile_form">
                <div class="col-sm-4">
                    <img src={UserImg} class="img-fluid" alt="..."/>
                </div>
                <div class="col-sm-8">
                    <h2>{user.username}</h2>
                    <hr></hr>
                    <h5>{user.email}</h5>
                    <div id="block_container"> 
                    <h5>Your Favourite Movie: &nbsp;</h5>
                    <form onSubmit={refresh}>
                        <button class="badge rounded-pill bg-warning text-dark" type="submit">Refresh Record</button> 
                    </form>
                    </div>
                    <div>
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Movie Name</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {user.favMovie?.map(favMovie => {
                                    return (
                                    <tr>
                                        <td>{favMovie.title}</td>
                                        <td><Link class="btn btn-info" to={`/movie/${favMovie.movieID}`}>Watch More</Link></td>
                                        <td>
                                            <form onSubmit={deleteHandler}>
                                                <input type="hidden" name="movieID" value={favMovie.movieID}/>
                                                <button class="btn btn-danger" type="submit"><FontAwesomeIcon icon={faTrashCan} color="white"/></button>
                                            </form>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> 
                </div>
        </div>
    );
}

export default UserProfile;