let user = require("./user.js");

console.log(`userName: ${user.userName}`);

let http = require("http");
let url = require("url");
let util = require("util");

let server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // url.parse(req.url);
    // inspect 是可以将对象转化成字符串
    util.inspect(url.parse(req.url));
    res.end(util.inspect(url.parse(req.url)));
});

server.listen(9000, "127.0.0.1", () => {
    console.log("服务器已经运行,请打开浏览器,http://127.0.0.1:9000");
});
