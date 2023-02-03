const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./account.js')
const taskRoutes = require('./task.js')


router.use(accountRoutes)
router.use(taskRoutes)
module.exports = router;