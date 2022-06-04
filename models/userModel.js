const mongoose = require('mongoose');

// user schema
const userSchema = {
    username: String,
    password: String,
    email: String,
    favMovie: Array,
    ratedMovie: Array
}
  
const User = mongoose.model('s180609303_user', userSchema);

module.exports = User;