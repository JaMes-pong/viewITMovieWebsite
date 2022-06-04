import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UserImg from "../images/user.png";

// user profile component.
function UserProfile() {
    const { id } = useParams();
    // user model
    const [user, setUser] = useState({});
    // fetch user data from server by userID
    useEffect(() => { 
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/login/profile/${id}`).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setUser(jsonRes))
        }
        fetchData();
    },[]);

    // delete favMovie and refresh local storage
    function deleteHandler(e) {
        e.preventDefault();
        let uid = user._id;
        let uname = user.username;
        let data = new FormData(e.target);
        let deleteID = data.get('movieID');
        console.log('You clicked delete.' + deleteID + " " + uid);

        // delete favourite movie
        async function deleteFavMovie() {
            const response = await fetch('http://localhost:3001/login/removefav', {
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
                }
            })
        
            // refresh localstorage
            const response_a = await fetch('http://localhost:3001/login/profile', {
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
                    window.location.reload();
                }
            }) 
        }
        deleteFavMovie();
    }

    // delete rated movie and refresh local storage
    function deleteRateHandler(e) {
        e.preventDefault();
        let uid = user._id;
        let uname = user.username;
        let data = new FormData(e.target);
        let deleteID = data.get('movieID');
        console.log('You clicked delete.' + deleteID + " " + uid);

        // delete rated movie
        async function deleteRatedMovie() {
            const response = await fetch('http://localhost:3001/login/removerate', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, movieID: deleteID })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Not in favorite") {
                    alert("Not in rated, cannot delete");
                } else {
                    alert("Your rate has been removed, you can rate it again!");
                }
            })
        
                
            // refresh localstorage
            const response_a = await fetch('http://localhost:3001/login/profile', {
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
                    window.location.reload();
                }
            }) 
        }
        deleteRatedMovie();
    }


    // refresh localstorage function
    function refresh(e) {
        //e.preventDefault();
            let uid = user._id;
            let uname = user.username;
            
            async function refreshLocalStorage() {
                const response = await fetch('http://localhost:3001/login/profile', {
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
                        window.location.reload();
                    }
                })
            }
            refreshLocalStorage();
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
                    <p>{user.email}</p>
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

                    <h5>Rated Movie: &nbsp;</h5>
                    </div>
                    <div>
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Movie Name</th>
                                    <th scope="col">Rated</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {user.ratedMovie?.map(ratedMovie => {
                                    return (
                                    <tr>
                                        <td>{ratedMovie.title}</td>
                                        <td>{ratedMovie.rate}</td>
                                        <td><Link class="btn btn-info" to={`/movie/${ratedMovie.movieID}`}>Watch More</Link></td>
                                        <td>
                                            <form onSubmit={deleteRateHandler}>
                                                <input type="hidden" name="movieID" value={ratedMovie.movieID}/>
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