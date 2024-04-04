"use strict";
require("dotenv").config();
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public", {
   index: "index.html",
   extensions: ['html']
}));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// validator
const planController = require("./Controllers/planController");

// controller

//
app.get("/", (req, res) => {
    console.log("this is a test");
});

app.get("/api/search", planController.searchByOperations);
app.get("/results/:planID",planController.renderSingleResult);
app.post("/api/add",planController.addToDatabase);

const {PORT} = process.env;
app.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`)
})
module.exports = {
   app
};