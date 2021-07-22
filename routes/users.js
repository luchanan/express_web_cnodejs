var express = require('express');
var router = express.Router();
var axios = require('../api/axios')
/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get('home').then(r => {
    res.render('users', { title: 'Users', data: r });
  })
});

module.exports = router;
