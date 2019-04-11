var express = require("express");
var router = express.Router();
let User = require("./../modules/users");

// login
router.post("/login", function (req, res, next) {
    let param = {
        "userName": req.body.userName,
        "userPwd" : req.body.userPwd
    };

    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg   : err.message
            });
        } else {
            res.json({
                status: "0",
                msg   : "",
                result: {
                    userId    : doc.userId,
                    userName  : doc.userName,
                    productNum: doc.cartList
                }
            });
        }
    });
});

// logout
router.post("/logout", function (req, res, next) {
    res.json({
        status: "0",
        msg   : "",
        result: ""
    });
});

// get shopCartList
router.post("/shopCartList", function (req, res, next) {
    let userId = req.body.userId;
    User.findOne({"userId": userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg   : err.message
            });
        } else {
            res.json({
                status: "0",
                msg   : "success",
                result: doc.cartList
            });
        }
    });
});

// cartDel
router.post("/cartDel", function (req, res, next) {
    let userId = req.body.userId;
    let productId = req.body.productId;
    User.update({"userId": userId}, {$pull: {cartList: { "productId": productId }}}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg   : err.message
            });
        } else {
            res.json({
                status: "0",
                msg   : "success"
            });
        }
    });
});

module.exports = router;
