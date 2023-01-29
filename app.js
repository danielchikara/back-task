const express = require("express")
const bodyParser = require("body-parser")
const fs =  require('fs');

const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extende: true}));

const routes = require('./routes/Route')
app.use('/',routes)

app.listen(3000, ()=>{
    console.log("listeniing at port: 3000")
})