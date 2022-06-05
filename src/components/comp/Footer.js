import React from "react";
import {Link} from 'react-router-dom';  
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa'

// Footer component
function Footer() {
    return(
        <div class="footer-basic">
        <footer>
            <div class="social"><FaFacebookSquare color="white" fontSize="2em"/><FaInstagramSquare color="white" fontSize="2em"/><FaTwitterSquare color="white" fontSize="2em"/></div>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Home</a></li>
                <li class="list-inline-item"><Link to="/about">About</Link></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p class="copyright">View IT © 2022 <br></br> Developed by: James </p>
        </footer>
    </div>
    );
}

export default Footer;	
