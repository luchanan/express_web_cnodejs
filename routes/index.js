var express = require('express');
var router = express.Router();
var axios = require('../api/axios')
var { format } = require('timeago.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  var type = Object.keys(req.query).length > 0 ? req.query.tab : 'all'
  var page = Object.keys(req.query).length > 0 ? req.query.page : 1
  var params = {
    tab: type,
    page,
    limit: 20,
    mdrender: false
  }
  // 找不到接口返回的分页信息
  axios.get('index', params).then(r => {
    // 接口返回：{success: true, data: []} 对应页面可以根据返回渲染数据
    var data = r.data.map(items => {
      items.last_reply_at = format(items.last_reply_at, 'zh_CN')
      return items
    })
    // 找到路由views/index渲染, 并且把数据传递
    res.render('index', {data, type, page});
  })
});

// 搜索
router.get('/search', function(req, res, next) {
  res.redirect('https://www.google.com.hk/search?q=site:cnodejs.org+' + req.query.q)
});

// 创建主题
router.get('/topic/create', function(req, res, next) {
  res.render('topic/create', {type: 'add', data: {}})
});

// 修改主题
router.get('/topic/:id/edit', function(req, res, next) {
  // mdrender: false返回markdown
  axios.get('topicDetail', {id: req.params.id, mdrender: false}).then(r => {
    var data = r.data
    res.render('topic/create', {type: 'edit', data})
  }).catch(e => {
  })
});

// 主题详情
router.get('/topic/:id', function(req, res, next) {
  axios.get('topicDetail', {id: req.params.id, mdrender: true}).then(r => {
    var data = r.data
    data.create_at = format(data.create_at, 'zh_CN')
    data.replies.forEach(items => {
      items.create_at = format(items.create_at, 'zh_CN')
    })
    res.render('detail', {data})
  }).catch(e => {
  })
});

module.exports = router;
