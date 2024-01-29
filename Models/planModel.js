"use strict";
const db = require("./db");

function testFunction() {
    const sql = `SELECT * FROM plans`;
    const stmt = db.prepare(sql);
    const result = stmt.all();
    return result;
}

/* NOTE: currently the database and their model functions store
   length, width, and height (imperial measurements) as a total of inches,
   which are divided by 12 and displayed. it may be more concise to go back
   later and redesign them to store feet and inches seperately
*/

function searchByLength(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
    FROM plans WHERE length BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByWidth(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt,
     length % 12 AS lengthIn, width / 12 AS widthFt, width % 12 AS widthIn,
     height % 12 AS heightIn, height / 12 AS heightFt,
     FROM plans WHERE width BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchByHeight(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt,
     length % 12 AS lengthIn, width / 12 AS widthFt, width % 12 AS widthIn,
     height % 12 AS heightIn, height / 12 AS heightFt,
     FROM plans WHERE width BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchBySQFT(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
     height % 12 AS heightIn, height / 12 AS heightFt,
     FROM plans WHERE overallSQFT BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByFloors(floors) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn, 
     width / 12 AS widthFt, width % 12 AS widthIn,
     height % 12 AS heightIn, height / 12 AS heightFt, 
     FROM plans WHERE floors=@floors`;
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
    searchByHeight
}