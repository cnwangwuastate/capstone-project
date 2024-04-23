"use strict";
const argon2 = require("argon2");
const userModel = require("../Models/userModel");

async function createNewUser(req, res) {
    const {email, password} = req.body;
    const userID = await userModel.addUser(email, password);
    if (!userID) {
        return res.sendStatus(409); // Conflict
    }
    res.json({"userID": userID}); // Return generated userID
}

async function logIn(req, res) {
    const {userID, password} = req.body; // Use userID instead of username
    const user = userModel.getUserByUserID(userID); // Get user by userID
    if (!user) {
        return res.sendStatus(400); // Bad Request
    }
    const {passwordHash} = user;
    if (await argon2.verify(passwordHash, password)) {
        // Handle successful login
        res.json({"message": "Login successful"});
    } else {
        return res.sendStatus(400); // Bad Request
    }
}

module.exports = {
    createNewUser,
    logIn
};
