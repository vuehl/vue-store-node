// 服务端server/routes/goods.js文件
// 引入相关模块
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const goods = require("../modules/goods"); // 引入goods模板

// 连接本地mongodb数据库的mall集合
mongoose.connect("mongodb://localhost:27017/store");
mongoose.connection.on("connected", () => {
    console.log("mongoDB连接成功");
});
mongoose.connection.on("error", () => {
    console.log("mongoDB连接出错");
});
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB断开连接");
});

router.get("/", (req, res, next) => {
    // 利用goods模板调用mongooseAPI进行数据库查询
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let skip = (page - 1) * pageSize;
    let sort = req.param("sort");
    console.log(page);
    console.log(pageSize);
    console.log(skip);
    let params = {}; // 这个是查询参数
    let goodModels = goods.find(params).skip(skip).limit(pageSize);
    goodModels.sort({"salePrice": sort});
    goodModels.exec({}, (err, doc) => { // 查询的回调函数
        "use strict";
        if (err) {
            res.json({
                status: 1,
                msg: err.message
            });
        } else {
            res.json({ // 利用res将数据返回给get请求
                status: 0,
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    });
});

module.exports = router;
