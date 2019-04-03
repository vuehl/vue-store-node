// const express = require("express");

// let app = express();
// let goodsData = require("./../mock/goods.json");
// let router = express.Router();
// router.get("/goods", function (req, res) {
//     res.json(goodsData);
//     res.send("I connect a server");
// });

// app.use(router);

var express = require("express");
var app = express();
let goodsData = require("../mock/goods.json");
app.get("/goods", function (req, res) {
    // res.send("hello word");
    res.json(goodsData);
});
app.listen(8090);
