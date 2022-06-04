import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

// movie list component.
function MovieList() {
    // movie model
    const [movie, setMovie] = useState([{
       
    }]);
    
    // fetch movie data from server
    useEffect(() => { 
        fetch(`http://localhost:3001/movieList`).then(res => {
            if(res.ok) {
                return res.json();
            }
        }).then(jsonRes => setMovie(jsonRes))
    });

    return(
        <div class="container">
            <h1 id="about">Movie Database</h1>
            <hr></hr>
            <table class="table table-dark table-hover" id="movielist">
                <thead>
                    <tr>
                        <th scope="col">Movie ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Release date</th>
                        <th scope="col">Running Time</th>
                    </tr>
                </thead>
            <tbody>
            {movie.map(movie => (
            <tr>
                <th scope="row">{movie.movieID}</th>
                <td><Link to={`/movie/${movie.movieID}`}>{movie.title}</Link></td>
                <td>{movie.release_date}</td>
                <td>{movie.running_time}</td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
    );
}

export default MovieList;