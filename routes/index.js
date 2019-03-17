var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise-native');
/* GET home page. */

var config = require('../config');
var utils = require('../lib/utils');
router.post('/email/', function(req, res, next) {
  request('http://www.globaltourcreatives.com/api/?post=contactForm', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response.
    return res.json(body);
  });
});

router.get('/*', function(req, res, next) {
  console.log('serving up a static HTML file');
  res.sendFile(path.join(__dirname + '../public/index.html'));
});

module.exports = router;
