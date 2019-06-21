"use strict";
const fs       = require("fs");
const ejs      = require("ejs");
const path     = require("path");
const express  = require("express");
const router   = express.Router();
module.exports = router;

router.get('/*', view);
router.get('/', view);

function view(req, res, next) {
    console.log('view connect!');

    const file     = fs.readFileSync(path.join(__dirname + "../../../public/App/index.ejs"), "utf-8");
    const rendered = ejs.render(file, { user : true });
    console.log(path.join(__dirname + "../../../public/App/index.ejs"));
    res.send(rendered);
}
