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
            res.cookie("userId", doc.userId, {
                path  : "/",
                maxAge: 1000 * 60 * 60
            });
            // res.session.user = doc.userId;
            res.json({
                status: "0",
                msg   : "",
                result: {
                    userName: doc.userName
                }
            });
        }
    });
});

// logout
router.post("/logout", function (req, res, next) {
    res.cookie("userId", "", {
        path  : "/",
        maxAge: -1
    });
    res.json({
        status: "0",
        msg   : "",
        result: ""
    });
});

module.exports = router;
