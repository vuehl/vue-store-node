var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var ejs = require("ejs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(".html", ejs.__express);
// view engine 代表的是 视图引擎
app.set("view engine", "html");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// 包含文件routes/goods.js
// 将访问路径定位到文件
let goods = require("./routes/goods");
let users = require("./routes/users");
app.use("/goods", goods);
app.use("/users", users);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// 这个users 相当于是一级路由,后面的users get方法里面的是二级路由,就要连接起来用
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
