const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const router = express.Router();
const Movie = require('../models/movieModel');

app.use(bodyParser.urlencoded({ extended: true }));

// main route to get all movies (debug route)
router.route("/").get((req, res) => {
    Movie.find().limit(8).then(foundMovie => res.json(foundMovie))
});

// random movie route
router.route("/randommovie").get((req, res) => {
    Movie.aggregate([{ $project: { movieID: "$movieID", title: "$title", poster: "$poster", rate: { $avg: '$rate' }}}, { $sample: { size: 4 } }]).sort({movieID: -1}).limit(4).then(foundMovie => res.json(foundMovie))
});

// main route
router.route("/rate").get((req, res) => {
    Movie.aggregate([{ $project: { movieID: "$movieID", title: "$title", poster: "$poster", rate: { $avg: '$rate' }}} ]).limit(8).then(foundMovie => res.json(foundMovie))
    //Movie.aggregate([{ $project: { movieID: "$movieID", title: "$title", poster: "$poster", rate: { $avg: '$rate' }}}, { $sort: { rate: -1 } } ]).limit(8).then(foundMovie => res.json(foundMovie))
});

// show the number of each rate of movie
router.route("/rate/rateDataDetail").get((req, res) => {
    Movie.aggregate([{ $unwind: "$rate" }, { $group: { _id: { name: "$title", movieID: "$movieID", rate: "$rate" }, count: { $sum: 1 } } }, { $group: { _id: "$_id.name", _id: "$_id.movieID", values: { $push: { rate: "$_id.rate", count: "$count" } } } } ]).then(foundMovie => res.json(foundMovie))
});


// movie list route
router.route("/movieList").get((req, res) => {
    Movie.find().then(foundMovie => res.json(foundMovie))
});

/*
router.route("/movie/:number").get((req, res) => {
    var number = req.params.number;
    Movie.findOne({movieID: number}).then(foundOneMovie => res.json(foundOneMovie))
});
*/

// movie detail route
router.route("/movie/:number").get((req, res) => {
    var number = Number(req.params.number);
    Movie.aggregate([
        { $match: { movieID: number } },
        { $project: { movieID: "$movieID", title: "$title", description: "$description", running_time: "$running_time", 
                        release_date: "$release_date", certification: "$certification", genre: "$genre", poster: "$poster", poster2: "$poster2", 
                        trailer: "$trailer", trailer_emb: "$trailer_emb", Cast: "$Cast", rate: { $avg: '$rate' } }}
    ]).then(foundOneMovie => res.json(foundOneMovie))
});

// search route
router.route("/search/:keyword").get((req, res) => {
    var keyword = req.params.keyword;
    Movie.find({title: {$regex: keyword, $options: 'i'}}).limit(10).then(searchOneMovie => res.json(searchOneMovie))
});

/*
router.route("/rate/movieID=:id&rate=:rate").get((req, res) => {
    var id = req.params.id;
    var rate = Number(req.params.rate);
    Movie.updateOne({movieID: id}, {$push: {rate: rate}}).then(foundOneMovie => res.json(foundOneMovie))
    //res.redirect('/movie/' + id);
});
*/

// rate route
router.route("/rate/rateMovie").post((req, res) => {
    var id = req.body.id;
    var rate = Number(req.body.rate);
    Movie.updateOne({movieID: id}, {$push: {rate: rate}}).then(foundOneMovie => { 
        res.json(foundOneMovie)
    })
});

module.exports = router;