const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/userModel');

app.use(bodyParser.urlencoded({ extended: true }));
// login route
router.route("/").post((req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username, password: password }, { username: 1, email: 1, favMovie: 1, ratedMovie: 1 }).then(foundUser => {
        if(foundUser) {
            res.json(foundUser);
        } else {
            res.json({message: "User not found"});
        }
    })
});

// user profile route
router.route("/profile").post((req, res) => {
    var userID = req.body.userID;
    var username = req.body.username;
    User.findOne({ _id: userID, username: username }, { username: 1, email: 1, favMovie: 1, ratedMovie: 1 }).then(foundUser => {
        if(foundUser) {
            res.json(foundUser);
        } else {
            res.json({message: "User not found"});
        }
    })
});

// user profile route
router.route("/profile/:id").get((req, res) => {
    var id = req.params.id; 
    User.findOne({ _id: id }, { username: 1, email: 1, favMovie: 1, ratedMovie: 1 }).then(foundUser => res.json(foundUser))
});

// add favouite movie route
router.route("/addfav").post((req, res) => {
    var userID = req.body.userID;
    var movieID = Number(req.body.movieID);
    var title = String(req.body.title);
    //User.updateOne({ userID: userID }, { $addToSet: { favMovie: { movieID: movieID, title: title } } }, { upsert: true } ).then(foundOneMovie => res.json(foundOneMovie))
    User.updateOne({ _id: userID }, { $addToSet: { favMovie: { movieID: movieID, title: title } } }, { upsert: true } ).then(addedFavorite => {
        if(addedFavorite) {
            res.json(addedFavorite);
        } else {
            res.json({message: "Already in favorite"});
        }
    })
});

// remove favouite movie route
router.route("/removefav").post((req, res) => {
    var userID = req.body.userID;
    var movieID = Number(req.body.movieID);
    User.updateOne({ _id: userID }, { $pull: { favMovie: { movieID: movieID } } }).then(removedFavorite => {
        if(removedFavorite) {
            res.json(removedFavorite);
        } else {
            res.json({message: "Not in favorite"});
        }
    })
});

// remove rated movie route
router.route("/removerate").post((req, res) => {
    var userID = req.body.userID;
    var movieID = Number(req.body.movieID);
    User.updateOne({ _id: userID }, { $pull: { ratedMovie: { movieID: movieID } } }).then(removedRated => {
        if(removedRated) {
            res.json(removedRated);
        } else {
            res.json({message: "Not in rated"});
        }
    })
});

// add rated movie route
router.route("/ratedMovie").post((req, res) => {
    var userID = req.body.userID;
    var movieID = Number(req.body.movieID);
    var title = String(req.body.title);
    var rate = Number(req.body.rate);
    User.updateOne({ _id: userID }, { $addToSet: { ratedMovie: { movieID: movieID, title: title, rate: rate } } }, { upsert: true } ).then(ratedMovie => {
        if(ratedMovie) {
            res.json(ratedMovie);
        } else {
            res.json({message: "Rated movie already"});
        }
    })
});


// register route with error handling
router.route("/register").post((req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    User.create({ username: username, password: password, email: email, favMovie: [], ratedMovie: [] }).then(newUser => {
        if(newUser) {
            res.json(newUser);
        } else {
            res.status(500).json({message: "User Exists"});
        }
    })
});

// username and email checker
router.route("/usernameCheck/checkAvailability").get((req, res) => {
    User.find({}, { username: 1, email: 1 }).then(foundUsername => res.json(foundUsername))
});


//debug route
router.route("/login").get((req, res) => {
    User.find({}, { username: 1, email: 1, favMovie: 1, ratedMovie: 1}).then(foundUser => res.json(foundUser))
});

module.exports = router;