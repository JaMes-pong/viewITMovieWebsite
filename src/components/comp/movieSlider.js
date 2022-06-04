import React from "react";
import {Link} from 'react-router-dom';
import Slider1 from "../images/slide1.png";
import Slider2 from "../images/slide2.jpg";
import Slider3 from "../images/slide3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

// slider component
function movieSlider() {
    return(
        <div class="container">
            <h1 id="h1-mpm">Most Popular Movies <FontAwesomeIcon icon={faAngleRight} /></h1>
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <Link to={"/movie/1"}>
                        <img src={Slider1} class="d-block w-100" alt="..." />
                        </Link>
                    </div>
                    <div class="carousel-item">
                        <Link to={"/movie/7"}>
                        <img src={Slider2} class="d-block w-100" alt="..." />
                        </Link>
                    </div>
                    <div class="carousel-item">
                        <Link to={"/movie/2"}>
                        <img src={Slider3} class="d-block w-100" alt="..." />
                        </Link>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default movieSlider;