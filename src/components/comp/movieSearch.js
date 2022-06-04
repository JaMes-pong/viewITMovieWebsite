import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';

// search movie by keyword
function MovieDetails() {
    const { keyword } = useParams();
    //console.log(keyword);
    // movie model
    const [movie, setMovie] = useState([{
      
    }]);
    
    // fetch movie data from server
    useEffect(() => { 
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/search/${keyword}`).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setMovie(jsonRes))
        }
        fetchData();
    }, []);

    return(
        <div class="container">
            <table class="table">
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

export default MovieDetails;