const express = require("express")
const taskRoutes = express.Router();
const fs = require('fs');
const dataPath = './Details/task.json'
const util = require('./utils.js')


taskRoutes.post('/task', (req, res) => {
    token = req.header('Authorization')
    console.log(token)
    const user = util.verifiedToken(token)
    if (user === 'err') {
        return res.status(400).send({ 'error': "invalid credentials" });

    }

    var taskData = util.getDataJson(dataPath)
    const newAccountId = Math.floor(100000 + Math.random() * 900000)

    taskData[newAccountId] = req.body
    taskData[newAccountId]["user"] = user

    util.saveDataJson(taskData, dataPath);
    return res.status(200).send({ success: true, msg: 'data added successfully' })
})


taskRoutes.get('/task', (req, res) => {
    token = req.header('Authorization')
    const user = util.verifiedToken(token)
    if (user === 'err') {
        return res.status(400).send({ 'error': "invalid credentials" });

    }
    var taskData = util.getDataJson(dataPath)
    obj = {};
    for (var keys of Object.keys(taskData)) {
        if (taskData[keys]["user"] === user) {
            obj[keys] = taskData[keys]
        }
    }
    return res.send(obj);

})


taskRoutes.put('/task/:id', (req, res) => {
    token = req.header('Authorization')
    const user = util.verifiedToken(token)
    if (user === 'err') {
        return res.status(400).send({ "error": " invalid credentials" });

    }
    let taskData = util.getDataJson(dataPath)
    const taskId = req.params['id'];

    try {
        taskUser = taskData[taskId]['user'];

    } catch {
        return res.status(404).send({ "error": "task no found" })
    }


    if (taskUser == user) {
        taskData[taskId]['status'] = "Finalizada"
        util.saveDataJson(taskData, dataPath);
        res.send({ success: true, msg: 'task data added successfully' })
    } else {
        return res.status(404)
    }
})

taskRoutes.delete('/task/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var taskData = util.getDataJson(dataPath)

        const taskId = req.params['id'];

        delete taskData[taskId];
        util.saveDataJson(taskData, dataPath);
        res.send(`accounts with id ${taskId} has been deleted`)
    }, true);
})


module.exports = taskRoutes