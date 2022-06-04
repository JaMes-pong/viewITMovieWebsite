import React, {useEffect, useState} from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

// register form component.
function RegisterForm() {
    const [check, setCheck] = useState({});
    useEffect(() => {
        async function checkAvailability() {
            const response = await fetch(`http://localhost:3001/login/usernameCheck/checkAvailability`).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setCheck(jsonRes))
        }
        checkAvailability();
    }, []);

    // handling register form
    function registerHandler(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        let username = data.get('username');
        let password = data.get('password');
        let email = data.get('email');
        //console.log("Regsiter: " + data.get('username') + " " + data.get('email') + " " + data.get('password'));

        // check if username/email is available
        let usedusername = check.map(check => check.username);
        let usedemail = check.map(check => check.email);

        // check if username is already used
        if (usedusername.includes(username) || usedemail.includes(email)) {
            alert("Username or email already used, please login or choose another one.");
        } else {
            // register user
            // post data to server
            async function postData() {
                const response = await fetch('http://localhost:3001/login/register', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                    body: JSON.stringify({ username: username, password: password, email: email })
                }).then (res => res.json())
                .then (data => {
                    console.log(data);
                    if (data.message === "User Exists") {
                        alert("User or Email Already Exists, Please Try Again");
                    } else {
                        alert("Register Successful, Welcome! " + data.username);
                        window.location.href = "/login";
                    }
                })
            }
            postData();   
        }  
    }

    return(
        <div class="container" id="lo_con">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <div class="logo">
                            <FontAwesomeIcon icon={faClapperboard} size="5x" color="#fff"/>
                            <h1>View IT</h1>
                            <p>Watch'em ALL!</p>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <h2>Sign up! <FontAwesomeIcon icon={faCircleRight}/></h2>
                        <hr></hr>
                        <form id="form-login_side" onSubmit={registerHandler}>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="username">Username</label>
                                <input type="username" id="username" class="form-control form-control-lg" name="username" placeholder="Enter Username" required/>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="username">Email</label>
                                <input type="email" id="email" class="form-control form-control-lg" name="email" placeholder="Enter Email" required/>
                            </div>
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-control form-control-lg" name="password" placeholder="Enter Password" required/>
                            </div>
                            <div class="text-center text-lg-start mt-4 pt-2">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-success btn-lg" type="submit">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;