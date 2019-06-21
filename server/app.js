"use static";

const express = require("express");
const app = express();
const path = require("path");
const logger       = require("morgan");
const useragent    = require("express-useragent");
const compression = require("compression");
const cors         = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser   = require("body-parser");

app.use(compression());
//view setup
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/public/App"));
app.set("view engine", "ejs");
console.log(path.join(__dirname, "/public/App"));

module.exports = app;