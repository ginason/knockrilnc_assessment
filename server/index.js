const express = require('express');
const http    = require("http");
const routes  = require("./routes");
const app = express();
const webpack       = require("webpack");
const middlewareDev = require("webpack-dev-middleware");
const middlewareHot = require("webpack-hot-middleware");
const config        = require("../webpack.config");
const compiler      = webpack(config);

const port = process.env.port || 8080;
app.use(middlewareDev(compiler));
app.listen(port, () => {
    routes(app);
    console.log(`Example app listening on port ${port}!`);
});