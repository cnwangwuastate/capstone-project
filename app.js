"use strict";
require("dotenv").config();
const path = require('path');
const express = require("express");
const app = express();
app.use(express.static("public", {
   index: "index.html",
   extensions: ['html']
}));

app.set('view engine', 'ejs');

// validator

// controller

app.get("/", (req, res) => {
    console.log("this is a test");
});

const {PORT} = process.env;
app.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`)
})
module.exports = {
   app
};