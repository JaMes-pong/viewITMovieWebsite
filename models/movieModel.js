const mongoose = require('mongoose');

// movie schema
const movieSchema = {
    movieID: Number,
    title: String,
    description: String,
    running_time: String,
    release_date: String,
    certification: String,
    genre: Array,
    poster: String,
    poster2: String,
    trailer: String,
    trailer_emb: String,
    Cast: [
        {
            director: String,
            writers: String,
            actor: String
        }
    ],
    rate: Array
}

const Movie = mongoose.model('s180609303_movie', movieSchema);

module.exports = Movie;