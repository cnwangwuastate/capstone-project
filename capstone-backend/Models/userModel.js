"use strict";
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require("crypto");
const argon2 = require("argon2");

//const dbPath = path.resolve(__dirname, 'database.db');
//const db = new sqlite3.Database(dbPath);
const db = require("./db")

// Function to initialize the Users table if not exists

async function addUser(email, password) {
    const userID = crypto.randomUUID();
    const hash = await argon2.hash(password);
    const insertUserQuery = 'INSERT INTO Users (userID, email, passwordHash) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.run(insertUserQuery, [userID, email, hash], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(userID);
            }
        });
    });
}

function getUserByEmail(email) {
    const selectUserQuery = 'SELECT * FROM Users WHERE email = ?';
    return new Promise((resolve, reject) => {
        db.get(selectUserQuery, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function getUserByUserID(userID) {
    const selectUserQuery = 'SELECT * FROM Users WHERE userID = ?';
    return new Promise((resolve, reject) => {
        db.get(selectUserQuery, [userID], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function setEmail(email, userID) {
    const updateUserQuery = 'UPDATE Users SET email = ? WHERE userID = ?';
    return new Promise((resolve, reject) => {
        db.run(updateUserQuery, [email, userID], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    addUser,
    getUserByEmail,
    getUserByUserID,
    setEmail
};
