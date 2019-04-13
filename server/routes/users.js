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
    User.findOne({"userId": userId}, {$pull: {cartList: { "productId": productId }}}, function (err, doc) {
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

// editCart 在作爲i調教查詢的時候,子節點是不需要$符號的
router.post("/editCart", function (req, res, next) {
    let userId = req.body.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    let checked = req.body.checked;
    User.update({"userId": userId, "cartList.productId": productId}, {$set: {"cartList.$.productNum": productNum, "cartList.$.checked": checked}}, function (err, doc) {
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

// shopping address
router.get("/addressList", function (req, res, next) {
    let userId = req.query.userId;
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
                result: doc.addressList
            });
        }
    });
});

// set default address
router.post("/setDefaultAddress", function (req, res, next) {
    let userId = req.body.userId;
    let addressId = req.body.addressId;
    User.findOne({"userId": userId, "addressList.addressId": addressId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg   : err.message
            });
        } else {
            doc.addressList.forEach(function (item) {
                if (item.addressId === addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            });
            doc.save(function (err, doc1) {
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
        }
    });
});

// delete address
router.post("/deleteAddress", function (req, res, next) {
    let userId = req.body.userId;
    let addressId = req.body.addressId;
    User.update({"userId": userId}, {$pull: {addressList: { "addressId": addressId }}}, function (err, doc) {
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
