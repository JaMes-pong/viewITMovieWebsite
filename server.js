const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// main server, running in port 3001
app.use(cors());
app.use(express.json());

// uri for mongodb !!(can be / will be changed on differrent environment)!!
const uri = 'mongodb://localhost:27017/180609303_moviedb'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to database");

app.use("/", require("./routes/movieRoute"));
app.use("/login", require("./routes/userRoute"));

// default listening port: 3001
app.listen(3001, () => console.log('Express Server started on port 3001'));