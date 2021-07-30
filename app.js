var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var axios = require('./api/axios')
var app = express();

var session = require('express-session');
// 使用 session 中间件
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒, 3分钟
  },
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 定义全局参数
app.use(function(req, res, next) {
  // 是否登录
  res.locals.isLogin = typeof req.session.user != 'undefined' && Object.keys(req.session.user).length > 0
  // 当前登录用户信息
  res.locals.userInfo = typeof res.locals.userInfo != 'undefined' ? res.locals.userInfo : (typeof req.session.user != 'undefined' ? req.session.user : {})
  next()
})

// router

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// 接口转发
// 客户端发送axios.post('/accesstoken', params).then(function (res) { 请求， 转发到这里来
app.post('/accesstoken', function(req, res, next) {
  axios.post('tokenLogin', {accesstoken: req.body.accesstoken}).then(r => {
    // 将一些信息保存在session中
    req.session.user = {
      token: req.body.accesstoken,
      id: r.id,
      avatar_url: r.avatar_url,
      loginname: r.loginname,
      score: 0
    };
    res.send(r)
  }).catch(e => {
    res.status(e.status).send(e)
  })
})

app.get('/getUserInfo', function(req, res, next) {
  axios.get('getUserInfo', {loginname: req.query.loginname}).then(r => {
    res.locals.userInfo = Object.assign(res.locals.userInfo, {score: r.data.score})
    res.send(r)
  }).catch(e => {
    res.status(e.status).send(e)
  })
})
// add
app.post('/topics', function(req, res, next) {
  var params = {
    accesstoken: req.session.user.token,
    ...req.body
  }
  axios.post('addTopic', params).then(r => {
    res.send(r)
  }).catch(e => {
    res.status(e.status).send(e)
  })
})
// update
app.post('/updateTopic', function(req, res, next) {
  var params = {
    accesstoken: req.session.user.token,
    ...req.body
  }
  axios.post('updateTopic', params).then(r => {
    res.send(r)
  }).catch(e => {
    res.status(e.status).send(e)
  })
})


app.get('/signout', function(req, res, next) {
  req.session.user = undefined
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
