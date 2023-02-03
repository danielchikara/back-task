const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./Routes/Route')
app.use('/', routes)

// Set up Global configuration access
dotenv.config();


//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 