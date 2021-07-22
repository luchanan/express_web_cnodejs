var express = require('express');
var router = express.Router();
var axios = require('../api/axios')
var { format } = require('timeago.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('index').then(r => {
    // {success: true, data: []}
    var data = r.data.map(items => {
      items.last_reply_at = format(items.last_reply_at, 'zh_CN')
      return items
    })
    res.render('index', {data});
  })
});

module.exports = router;
