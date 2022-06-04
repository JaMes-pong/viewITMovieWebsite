import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDice } from '@fortawesome/free-solid-svg-icons';

// This function has been deprecated.
// DEPRECATED!
function AfterRate() {
    /*
    const {id, rate} = useParams();
    //console.log(keyword);
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let random = getRandomInt(9);

    
    const [movie, setMovie] = useState([{
      
    }]);
    
    useEffect(() => { 
        fetch(`http://localhost:3001/rate/movieID=${id}&rate=${rate}`).then(res => {
            if(res.ok) {
                return res.json();
            }
        }).then(jsonRes => setMovie(jsonRes))
    }, []);
    

    return(
        <div class="container">
            <div class="row">
                <div class="col" id="rate-col">
                </div>
                <div class="col" id="rate-col">
                    <div class="alert alert-success" id="after-rate" role="alert">
                        <p>Rated successfully!</p>
                        <p>Thank you!</p>
                        <div class="anim">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div class="row">
                            <div class="col" id="rate-col">
                                <div class="d-grid gap-2">
                                    <Link to={"/"} class="btn btn-primary">Main Menu</Link>
                                </div>
                            </div>
                            <div class="col" id="rate-col">
                                <div class="d-grid gap-2">
                                    <Link to={"/movieList"} class="btn btn-warning">Movie Database</Link>
                                </div>
                            </div>
                            <div class="col" id="rate-col">
                                <div class="d-grid gap-2">
                                    <Link to={`/movie/${random}`} class="btn btn-success"><FontAwesomeIcon icon={faDice} />Random Movie</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col" id="rate-col">
                </div>
            </div>
        </div>
    );
    */
}

export default AfterRate;
