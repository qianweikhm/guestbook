var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParse = require('body-parser');

var app = express();

// 设置引擎ejs
app.set('views', path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// 设置全局变量
var entries = [];
app.locals.entries = entries;

// 日志记录
app.use(morgan("dev"));

// 中间件
app.use(bodyParse.urlencoded({ extends: false }));


// var routes = require('./routes')(app)
app.get('/', function (req, res) {
    res.render("index");
})

// 新留言页面
app.get('/new-entry', function (req, res) {
    res.render("new-entry")
})

// POST 动作进行留言新建的路由处理
app.post("/new-entry", function (request, response) {
    // 如果用户提交的表单没有标题或者内容，则返回一个 400 的错误
    if (!request.body.title || !request.body.body) {
        response.status(400).send("Entries must have a title and a body.");
        return;
    }

    // 添加新留言到 entries 中
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    // 重定向到主页来查看你的新条目
    response.redirect("/");
});

// 404
app.use(function (req, res) {
    res.status(404).render("404")
})


http.createServer(app).listen(3000, function () {
    console.log("started on 3000")
})
