import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import {useParams, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke, faHeart } from '@fortawesome/free-solid-svg-icons';

// movie details component.
function MovieDetails() {
    const { id } = useParams();

    // handling the rating action
    function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        let uid = user._id;
        let uname = user.username;
        let id = data.get('movieID');
        let title = movie.map(movie => movie.title);
        let rate = data.get('rating');
        //console.log(data.get('movieID') + " " + data.get('rating'));
        //console.log("user: " + uid + " movie: " + id + " title: " + title + " rate: " + rate);

        // post rating data to server - movie collection
        async function postData_rate() {
            const response_a = await fetch('http://localhost:3001/rate/rateMovie', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ id: id, rate: rate })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Rated Failed") {
                    alert("Error occured, please try again");
                } else {
                    //
                }
            })

        // post rating data to server - user collection
            const response_b = await fetch('http://localhost:3001/login/ratedMovie', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, movieID: id, title: title, rate: rate })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Rated Failed") {
                    alert("Error occured, please try again");
                } else {
                    alert("Rated successfully");
                }
            })
        

        // refresh the local storage
            const response_c = await fetch('http://localhost:3001/login/profile', {
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
        postData_rate();
    }

    // movie model
    const [movie, setMovie] = useState([{}]);
    // fetch movie data from server by movie id
    useEffect(() => { 
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/movie/${id}`).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setMovie(jsonRes))
        }
        fetchData();
    }, []);

    // user model
    const [user, setUser] = useState({});
    useEffect(() => {
        // fetch user data from local storage
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    // handling the user's favorite action
    function handleAddFav(e) {
        e.preventDefault();
        let uid = user._id;
        let uname = user.username;
        let movieID = id;
        let title = movie.map(movie => movie.title);
        let data = new FormData(e.target);
        console.log("movieID: " + movieID + " " + title + " " + uid);

        // post favorite data to server - user collection
        async function postFavoriteData() {
            const response = await fetch('http://localhost:3001/login/addfav', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ userID: uid, movieID: movieID, title: title })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "Already in favorite") {
                    alert("Already in favorite movies");
                } else {
                    alert("Added to favorite movies");
                }
            })
        
        // refresh the local storage
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
        postFavoriteData();
    }

    return(
        <div class="container">
            <div class="row">
                {movie.map(movie =>
                <div class="col-10">
                    <h1 id="h1-filmdetails"> {movie.title} </h1>
                    <p id="p-filmdata">{movie.release_date}  | {movie.running_time}</p>
                </div>
                )}
            </div>
            <div class="row">
                {movie.map(movie =>
                <div class="col">
                    <img src={"../" + process.env.PUBLIC_URL + movie.poster} class="img-thumbnail" alt="..."/>
                </div>
                )}
                {movie.map(movie =>
                <div class="col">
                    <iframe width="600" height="480" src={movie.trailer_emb} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                )}
                {movie.map(movie =>
                <div class="col">
                    <img src={"../" + process.env.PUBLIC_URL + movie.poster2} class="img-thumbnail" alt="..."/>
                </div>
                )}
            </div>
            <div class="row">
                <div class="col-4">
                    {movie.map(movie =>
                    <div class="alert Dark" role="alert">
                        <h5>
                            {movie.genre?.map((genre, i) => {
                            return (
                            <div key={i} id="genre">
                            <span class="badge rounded-pill bg-light text-dark">{genre}</span>
                            </div>
                            )
                            })}
                        </h5>
                    </div>
                    )}
                </div>
                <div class="col-4">
                    {movie.map(movie =>
                    <div class="alert alert-dark" role="alert">
                    Rate: 
                    {
                    (() => {
                        if(movie.rate === 5) { // 5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                        {
                                            (() => {
                                                var ratedfilm = [];
                                                    for (let i = 0; i < user.ratedMovie.length; i++) {
                                                        ratedfilm.push(user.ratedMovie[i].movieID)
                                                    }
                                                        return ratedfilm.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                        ) : (
                                                            <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                {close => (
                                                                    <div class="rate-modals">
                                                                        <button className="close" onClick={close}>
                                                                            &times;
                                                                        </button>
                                                                        <div class="header">
                                                                            <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                            <h3>RATE THIS</h3>
                                                                            <h2>{movie.title}</h2>
                                                                        </div>
                                                                        <div class="content">
                                                                            <form onSubmit={handleSubmit}>
                                                                                <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                <div class="rate">
                                                                                    <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                    <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                </div>
                                                                            </form> 
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Popup> 
                                                        )
                                                    })()
                                                } &nbsp;
                                                
                                                { 
                                                    (() => {
                                                        var favmovieID = [];
                                                        for (let i = 0; i < user.favMovie.length; i++) {
                                                            favmovieID.push(user.favMovie[i].movieID)
                                                        } 
                                                        return favmovieID.includes(movie.movieID) ? ( 
                                                        <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                        ) : (
                                                        <form onSubmit={handleAddFav}>
                                                            <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                        </form>
                                                        )             
                                                    })()
                                                }
                                    </div> 
                                    ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }               
                                </div>
                            )
                        } else if (movie.rate > 4 && movie.rate < 5) { // 4.5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}4.5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                        <div id="block_container">
                                        {
                                            (() => {
                                                var ratedfilm = [];
                                                    for (let i = 0; i < user.ratedMovie.length; i++) {
                                                        ratedfilm.push(user.ratedMovie[i].movieID)
                                                    }
                                                        return ratedfilm.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                        ) : (
                                                            <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                {close => (
                                                                    <div class="rate-modals">
                                                                        <button className="close" onClick={close}>
                                                                            &times;
                                                                        </button>
                                                                        <div class="header">
                                                                            <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                            <h3>RATE THIS</h3>
                                                                            <h2>{movie.title}</h2>
                                                                        </div>
                                                                        <div class="content">
                                                                            <form onSubmit={handleSubmit}>
                                                                                <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                <div class="rate">
                                                                                    <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                    <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                </div>
                                                                            </form> 
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Popup> 
                                                        )
                                                    })()
                                                } &nbsp;
                                                
                                                { 
                                                    (() => {
                                                        var favmovieID = [];
                                                        for (let i = 0; i < user.favMovie.length; i++) {
                                                            favmovieID.push(user.favMovie[i].movieID)
                                                        } 
                                                        return favmovieID.includes(movie.movieID) ? ( 
                                                        <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                        ) : (
                                                        <form onSubmit={handleAddFav}>
                                                            <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                        </form>
                                                        )             
                                                    })()
                                                }
                                    </div> 
                                    ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                                 
                                </div>
                            )
                        } else if (movie.rate === 4) { // 4 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}4 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                  
                                </div>
                            )
                        } else if (movie.rate > 3 && movie.rate < 4) { // 3.5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}3.5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                  
                                </div>
                            )
                        } else if (movie.rate === 3) { // 3 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}3 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                  
                                </div>
                            )
                        } else if (movie.rate > 2 && movie.rate < 3) { // 2.5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}2.5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                  
                                </div>
                            )
                        } else if (movie.rate === 2) { // 2 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}2 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                  
                                </div>
                            )
                        } else if (movie.rate > 1 && movie.rate < 2) { // 1.5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}1.5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                 
                                </div>
                            )
                        } else if (movie.rate === 1) { // 1 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>{' '}1 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                 
                                </div>
                            )
                        } else if (movie.rate < 1) { // 0.5 stars
                            return (
                                <div id="block_container">
                                    <FontAwesomeIcon icon={faStarHalfStroke} color="yellow"/>{' '}0.5 / 5{' '}&nbsp;
                                    {
                                        user.username ? (
                                            <div id="block_container">
                                            {
                                                (() => {
                                                    var ratedfilm = [];
                                                        for (let i = 0; i < user.ratedMovie.length; i++) {
                                                            ratedfilm.push(user.ratedMovie[i].movieID)
                                                        }
                                                            return ratedfilm.includes(movie.movieID) ? ( 
                                                                <button class="badge bg-secondary" id="btn-rate" type="submit" disabled>Rated<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                            ) : (
                                                                <Popup trigger={<button class="badge badge-warning" id="ratebtn">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button>} modal>
                                                                    {close => (
                                                                        <div class="rate-modals">
                                                                            <button className="close" onClick={close}>
                                                                                &times;
                                                                            </button>
                                                                            <div class="header">
                                                                                <h1><FontAwesomeIcon icon={faStar} /></h1>
                                                                                <h3>RATE THIS</h3>
                                                                                <h2>{movie.title}</h2>
                                                                            </div>
                                                                            <div class="content">
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <input type="hidden" name="movieID" value={movie.movieID} />
                                                                                    <div class="rate">
                                                                                        <input type="radio" id="rating10" name="rating" value="5" required /><label for="rating10" title="5 stars"></label>
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
                                                                                        <button class="btn btn-warning" id="btn-rate" type="submit">Rate<FontAwesomeIcon icon={faStar} color="tomato" /></button>
                                                                                    </div>
                                                                                </form> 
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup> 
                                                            )
                                                        })()
                                                    } &nbsp;
                                                    
                                                    { 
                                                        (() => {
                                                            var favmovieID = [];
                                                            for (let i = 0; i < user.favMovie.length; i++) {
                                                                favmovieID.push(user.favMovie[i].movieID)
                                                            } 
                                                            return favmovieID.includes(movie.movieID) ? ( 
                                                            <button class="badge bg-secondary" id="btn-rate" type="submit" disabled title="Movie in favourite already">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            ) : (
                                                            <form onSubmit={handleAddFav}>
                                                                <button class="badge bg-danger" id="btn-rate" type="submit" >Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink" /></button>
                                                            </form>
                                                            )             
                                                        })()
                                                    }
                                        </div> 
                                        ) : (
                                        <div>
                                            <button class="badge bg-secondary" id="ratebtn" disabled title="Please login first">Rate<FontAwesomeIcon icon={faStar} color="tomato"/></button> &nbsp;
                                            <button class="badge bg-danger" id="ratebtn" type="submit" disabled title="Please login first">Favourite Movie<FontAwesomeIcon icon={faHeart} color="pink"/></button>
                                        </div>
                                        )
                                    }                 
                                </div>
                            )
                        }    
                    })()
                    }
                    </div>
                    )}
                </div>
                <div class="col">
                    {movie.map(movie =>
                    <div class="alert alert-primary" role="alert">
                    {
                        (() => { if (movie.certification === "PG") {
                            return (
                            <div>
                                MPAA: <span class="badge bg-success">{movie.certification}</span><br/>
                             </div>
                            )} else if (movie.certification === "PG-13") {
                            return (
                            <div>
                                MPAA: <span class="badge bg-primary">{movie.certification}</span><br/>
                            </div>
                            )} else if (movie.certification === "R") {
                            return (
                                <div>
                                    MPAA: <span class="badge bg-danger">{movie.certification}</span><br/>
                                </div>
                            )} else if (movie.certification === "COMING SOON") {
                            return (
                                <div>
                                    MPAA: <span class="badge bg-secondary">{movie.certification}</span><br/>
                                </div>
                            )} else {
                            return (
                                <div>
                                    MPAA: <span class="badge bg-info">{movie.certification}</span><br/>
                                </div>
                                )
                            }
                        }
                    )()}
                        Release: {movie.release_date}
                    </div>
                    )}
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    {movie.map(movie =>
                    <div>
                    {movie.description}<br/>
                    </div>
                    )}
                    <hr/>              
                    {movie.map(movie =>
                    <div>  
                    {movie.Cast?.map(cast => {
                    return (
                    <div id="genre">
                    <h5 id="cast-detail"><span id="cast-detail-in">Director: </span> {cast.director} </h5>
                    </div>
                    )
                    })}
                    </div>  
                    )}
                    <hr/>
                    {movie.map(movie =>
                    <div>  
                    {movie.Cast?.map(cast => {
                    return (
                    <div id="genre">
                    <h5 id="cast-detail"><span id="cast-detail-in">Writers: </span> {cast.writers} </h5>
                    </div>
                    )
                    })}
                    </div>  
                    )}
                    <hr/>
                    {movie.map(movie =>
                    <div>  
                    {movie.Cast?.map((cast, i) => {
                    return (
                    <div key={i} id="genre">
                    <h5 id="cast-detail"><span id="cast-detail-in">Stars: </span> {cast.actor} </h5>
                    </div>
                    )
                    })}
                    </div>  
                    )}
                    <hr/>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;