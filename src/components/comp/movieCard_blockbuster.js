import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

// movie card component.
function MovieCard() {
    // handling rating action
    function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        let uid = user._id;
        let uname = user.username;
        let id = data.get('movieID');
        let title = data.get('title');
        let rate = data.get('rating');
        //console.log(data.get('movieID') + " " + data.get('rating'));
        //console.log("user: " + uid + " movie: " + id + " title: " + title + " rate: " + rate);

        // post rating data to server - movie collection
        async function postData() {
            const response = await fetch('http://localhost:3001/rate/rateMovie', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ id: id, rate: rate })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Rated Failed") {
                    alert("Error occured, please try again");
                } else {
                }
            })
        
        // post rating data to server - user collection
            const response_a = await fetch('http://localhost:3001/login/ratedMovie', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, movieID: id, title: title, rate: rate })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Rated Failed") {
                    alert("Error occured, please try again");
                } else {
                    alert("Rated Successfully");
                }
            })
        
        // refresh local storage
            const response_b = await fetch('http://localhost:3001/login/profile', {
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
        postData();
    }

    // movie model
    const [movie, setMovie] = useState([{
        movieID: '',
        title:'',
        description: '',
        running_time: '',
        release_date: '',
        certification: '',
        genre: [],
        poster: '',
        poster2: '',
        trailer: '',
        trailer_emb: '',
        Cast: [
            {
                director: '',
                writers: '',
                actor: ''
            }
        ]
    }]);

    // fetch movie data from server
    useEffect(() => { 
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/rate`).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setMovie(jsonRes))
        }
        fetchData();
    },[]);

    // user model
    const [user, setUser] = useState({});
    useEffect(() => {
        // fetch user data from local storage
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return(
        <div class="container">
        <h1 id="h1-wt">Blockbuster <FontAwesomeIcon icon={faAngleRight} /></h1>
        <div class="row">
            {movie.map(movie => 
            <div class="col-sm-3">
                <div class="card bg-dark" id="card1">
                    <img src={process.env.PUBLIC_URL + movie.poster} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <div>
                            {
                                (() => {
                                    if(movie.rate === 5) { // 5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}5
                                            </div>
                                        )
                                    } else if (movie.rate > 4 && movie.rate < 5) { // 4.5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}4.5
                                            </div>
                                        )
                                    } else if (movie.rate === 4) { // 4 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}4
                                            </div>
                                        )
                                    } else if (movie.rate > 3 && movie.rate < 4) { // 3.5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}3.5
                                            </div>
                                        )
                                    } else if (movie.rate === 3) { // 3 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}3
                                            </div>
                                        )
                                    } else if (movie.rate > 2 && movie.rate < 3) { // 2.5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}2.5
                                            </div>
                                        )
                                    } else if (movie.rate === 2) { // 2 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}2
                                            </div>
                                        )
                                    } else if (movie.rate > 1 && movie.rate < 2) { // 1.5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>
                                                <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}1.5
                                            </div>
                                        )
                                    } else if (movie.rate === 1) { // 1 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}1
                                            </div>
                                        )
                                    } else if (movie.rate < 1) { // 0.5 stars
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}0.5
                                            </div>
                                        )
                                    }    
                                })()
                            }
                        </div>
                        <Link to={`/movie/${movie.movieID}`} class="film-title">{movie.title}</Link>
                        <p class="card-text"></p>
                        <div class="d-grid gap-2">
                            {
                                user.username ? (
                        <div class="d-grid gap-2">
                        {
                            (() => {
                                var ratedfilm = [];
                                for (let i = 0; i < user.ratedMovie.length; i++) {
                                    ratedfilm.push(user.ratedMovie[i].movieID)
                                }
                                return ratedfilm.includes(movie.movieID) ? ( 
                                    <button class="btn btn-secondary" id="btn-wt" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                ) : (
                                    <Popup trigger={<button class="btn btn-warning" id="btn-wt">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                        {close => (
                                        <div class="rate-modals">
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>
                                            <div class="header">
                                                <h1><FontAwesomeIcon icon={faStar}/></h1>
                                                <h3>RATE THIS</h3>
                                                <h2>{movie.title}</h2>
                                            </div>
                                            <div class="content">
                                                <form onSubmit={handleSubmit}>
                                                    <input type="hidden" name="movieID" value={movie.movieID}/>
                                                    <input type="hidden" name="title" value={movie.title}/>
                                                    <div class="rate">
                                                        <input type="radio" id="rating10" name="rating" value="5" /><label for="rating10" title="5 stars"></label>
                                                        <input type="radio" id="rating9" name="rating" value="4.5" /><label class="half" for="rating9" title="4.5 stars"></label>
                                                        <input type="radio" id="rating8" name="rating" value="4" /><label for="rating8" title="4 stars"></label>
                                                        <input type="radio" id="rating7" name="rating" value="3.5" /><label class="half" for="rating7" title="3.5 stars"></label>
                                                        <input type="radio" id="rating6" name="rating" value="3" /><label for="rating6" title="3 stars"></label>
                                                        <input type="radio" id="rating5" name="rating" value="2.5" /><label class="half" for="rating5" title="2.5 stars"></label>
                                                        <input type="radio" id="rating4" name="rating" value="2" /><label for="rating4" title="2 stars"></label>
                                                        <input type="radio" id="rating3" name="rating" value="1.5" /><label class="half" for="rating3" title="1.5 stars"></label>
                                                        <input type="radio" id="rating2" name="rating" value="1" /><label for="rating2" title="1 star"></label>
                                                        <input type="radio" id="rating1" name="rating" value="0.5" /><label class="half" for="rating1" title="0.5 star"></label>
                                                    </div>
                                                    <br></br>
                                                    <div class="d-grid gap-2 col-4 mx-auto">
                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    )
                                })()
                            }
                            </div>
                            ) : (
                                <div class="d-grid gap-2">
                                    <button class="btn btn-warning" id="btn-wt" disabled>Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>
                                </div>
                                )
                            }
                            <Link to={`/movie/${movie.movieID}`} class="btn btn-light">Watch More</Link>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}

export default MovieCard;