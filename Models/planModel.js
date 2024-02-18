"use strict";
const db = require("./db");

function testFunction() {
    const sql = `SELECT * FROM plans`;
    const stmt = db.prepare(sql);
    const result = stmt.all();
    return result;
}

function searchByLength(upper, lower) {
    const sql = `SELECT * FROM plans WHERE lengthFt BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByWidth(upper, lower) {
    const sql = `SELECT * FROM plans WHERE widthFt BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchByHeight(upper, lower) {
    const sql = `SELECT * FROM plans WHERE heightFt BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchBySQFT(upper, lower) {
    const sql = `SELECT * FROM plans WHERE overallSQFT BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByFloors(floors) {
    const sql = `SELECT * FROM plans WHERE floors=@floors`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "floors":floors
    });
    return result;

}

function getPlanByID(planID) {
    const sql = 'SELECT * FROM plans WHERE planID=@planID';
    const stmt = db.prepare(sql);
    const row = stmt.get({planID});
    return row;
}

module.exports = {
    testFunction,
    searchByFloors,
    searchByLength,
    searchByWidth,
    searchBySQFT,
    getPlanByID,
    searchByHeight
}