// 服务端server/routes/goods.js文件
// 引入相关模块
const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Goods = require("../modules/goods"); // 引入goods模板

// 连接本地mongodb数据库的store
mongoose.connect("mongodb://localhost:27017/store");
mongoose.connection.on("connected", () => {
    console.log("mongoDB连接成功");
});
mongoose.connection.on("open", () => {
    console.log("mongoDB打开成功");
});
mongoose.connection.on("error", () => {
    console.log("mongoDB连接出错");
});
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB断开连接");
});

// 查询商品列表数据
router.get("/list", (req, res, next) => {
    // 利用goods模板调用mongooseAPI进行数据库查询
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let skip = (page - 1) * pageSize;
    let sort = req.query.sort;
    // 这个是查询当前的价位
    let priceLevel = req.query.priceLevel;
    let params = {}; // 这个是查询参数
    let priceGt = 0;
    let priceLet = 0;
    if (priceLevel !== "all") {
        switch (priceLevel) {
        case "0":
            priceGt = 0;
            priceLet = 500;
            break;
        case "1":
            priceGt = 500;
            priceLet = 1000;
            break;
        case "2":
            priceGt = 1000;
            priceLet = 1500;
            break;
        case "3":
            priceGt = 1500;
            priceLet = 2000;
            break;
        case "4":
            priceGt = 2000;
            priceLet = 2500;
            break;
        }

        params = {
            salePrice: {
                $gt : priceGt,
                $lte: priceLet
            }
        };
    }

    let goodModels = Goods.find(params).skip(skip).limit(pageSize);
    goodModels.sort({"salePrice": sort});
    goodModels.exec({}, (err, doc) => { // 查询的回调函数
        "use strict";
        if (err) {
            res.json({
                status: 1,
                msg   : err.message
            });
        } else {
            res.json({ // 利用res将数据返回给get请求
                status: 0,
                msg   : "",
                result: {
                    count: doc.length,
                    list : doc
                }
            });
        }
    });
});

// 获取购物车列表
router.post("/addCart", function (req, res) {
    let userId = "201513530110";
    let productId = req.body.productId;
    let User = require("./../modules/users");
    User.findOne({"userId": userId}, function (err, userDoc) {
        if (err) {
            res.json({
                status: "1",
                msg   : err.message
            });
        } else {
            if (userDoc) {
                // 判断是否有这个商品
                let goodItem = "";
                userDoc.cartList.forEach((item) => {
                    if (parseInt(productId) === parseInt(item.productId)) {
                        goodItem = item.productId;
                        item.productNum++;
                    }
                });
                if (goodItem) {
                    userDoc.save(function (err3, doc3) {
                        if (err3) {
                            res.json({
                                status: "1",
                                msg   : err3.message
                            });
                        } else {
                            res.json({
                                status: "0",
                                msg   : "",
                                result: "success"
                            });
                        }
                    });
                } else {
                    Goods.findOne({productId: productId}, function (err, doc) {
                        if (err) {
                            res.json({
                                status: "1",
                                msg   : err.message
                            });
                        } else {
                            if (doc) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2, doc2) {
                                    if (err2) {
                                        res.json({
                                            status: "1",
                                            msg   : err2.message
                                        });
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg   : "",
                                            result: "success"
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;
