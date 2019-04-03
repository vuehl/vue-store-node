let user = require("./user.js");

console.log(`userName: ${user.userName}`);

let http = require("http");
let url = require("url");
// let util = require("util");
let fs = require("fs");

// 这个是创建一个server 的请求
let server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // util.inspect(url.parse(req.url));
    let pathName = url.parse(req.url).pathname;
    // 这个是代表读取文件 text/plain 代表的是文本输出
    fs.readFile(pathName.substring(1), function (err, data) {
        if (err) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
        } else {
            // 这个是把文件输出
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(data.toString());
        }
        // 这个是代表程序结束了
        res.end();
    });
});

server.listen(9000, "127.0.0.1", () => {
    console.log("服务器已经运行,请打开浏览器,http://127.0.0.1:9000");
});
