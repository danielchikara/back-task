const fs = require('fs');
const jwt = require('jsonwebtoken')
exports.saveDataJson = saveDataJson
exports.getDataJson = getDataJson
exports.getToken = getToken
exports.verifiedToken = verifiedToken

function saveDataJson(data, dataPath) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

function getDataJson(dataPath) {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

function getToken(user) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: user,
    };
    const token = jwt.sign(data, jwtSecretKey);
    console.log(token);
    return token;
}

function verifiedToken(token) {
    const dataPath = './Details/account.json'
    let user = 'err';
    const accounts = getDataJson(dataPath);
    token = token.replace('Token ', '');

    console.log("token:", token);
    for (var keys of Object.keys(accounts)) {
        if (accounts[keys]["token"] === token)
            user = keys;
    }

    return user;

} 
