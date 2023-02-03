const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');
const dataPath = './Details/account.json' 
const util = require('./utils.js')
const jwt = require('jsonwebtoken')



accountRoutes.post("/login", (req, res) => {
    // Validate User 

    let  email = req.body.email;
    let password = req.body.password;
    const accounts = util.getDataJson(dataPath);

    console.log (accounts)
    let token = '';
    
    
    for (var keys of Object.keys(accounts)){
      if (accounts[keys]["email"] === email && accounts[keys]["password"] === password  ){
        console.log(keys)
        token= util.getToken(keys)
        accounts[keys]["token"] = token
        util.saveDataJson(accounts,dataPath)
        

      }
    }
    if (token === ''){
      return res.status(400).send({'error':"invalid credentials"});
    }
    res.status(200).send(token);
});


// reading the data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

//save data user
accountRoutes.post('/usuario', (req, res) => {
   
    var existAccounts = util.getDataJson(dataPath);
    const newAccountId = Math.floor(100000 + Math.random() * 900000);

    existAccounts[newAccountId] = req.body
    existAccounts[newAccountId]["token"] = ''

    util.saveDataJson(existAccounts,dataPath);
    res.send({success: true, msg: 'account data added successfully'})
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = util.getDatajson()
  res.send(accounts)
})


//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = util.getDatajson()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    saveDataJson(existAccounts,dataPath);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = accountRoutes




