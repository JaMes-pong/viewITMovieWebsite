import React from "react";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

// login form component.
function LoginForm() {
    // handling login form
    function loginHandler(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        //console.log(data.get('username') + " " + data.get('password'));

        // post data to server
        async function postData() {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ username: data.get('username'), password: data.get('password') })
            }).then (res => res.json())
            .then (data => {
                console.log(data);
                if (data.message === "User not found") {
                    alert("User not found");
                } else {
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.href = "/";
                }
            })
        }
        postData();
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
                        <h2>Login <FontAwesomeIcon icon={faCircleRight}/></h2>
                        <hr></hr>
                        <form id="form-login_side" onSubmit={loginHandler}>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="username">Username</label>
                                <input type="username" id="username" class="form-control form-control-lg" name="username" placeholder="Enter username" required/>
                            </div>
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-control form-control-lg" name="password" placeholder="Enter password" required/>
                            </div>
                            <div class="text-center text-lg-start mt-4 pt-2">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-success btn-lg" type="submit">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;