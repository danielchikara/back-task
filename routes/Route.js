const express = require("express");
const router = express.Router();
const fs = require('fs');

const accountRoutes = require('./account.js')
router.use(accountRoutes) // use account route

module.exports = router