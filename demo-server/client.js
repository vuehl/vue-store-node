let http = require("http");
let util = require("util");

// http 可以监听第三方的接口 并且可以返回结果
http.get("http://www.imooc.com/u/card", function (res) {
    let data = "";
    res.on("data", function (chunk) {
        data += chunk;
    });

    res.on("end", function () {
        let result = JSON.parse(data);
        console.log("result: " + util.inspect(result));
    });
});
