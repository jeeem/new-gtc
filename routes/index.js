var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise-native');
/* GET home page. */

var config = require('../config');

router.get('/search/:string', function(req, res, next) {
  console.log('req.params.string', req.params.string);
  var searchURL = 'http://www.globaltourcreatives.com/api/?get=search&var=' + req.params.string;
  console.log('searchURL', searchURL);
  request(searchURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response.
    return res.json(body);
  });
});

router.get('/*', function(req, res, next) {
  console.log(req.baseUrl);
  console.log(req.path);

  var templateVars = {
    title: 'Express',
  };
  var initialPage = 'home';
  if ( req.path.length > 1 && req.path.charAt( 0 ) === '/' ) {
    initialPage = req.path.slice( 1 );
  }
  if ( initialPage !== 'home'
    && initialPage !== 'about'
    && initialPage !== 'contact') {
      initialPage = 'home';
    }
  templateVars[`page${initialPage}`] = true;
  console.log(templateVars);
  rp(config.gtc.homeToursPage)
    .then(data => {
      let newdata = JSON.parse(data);
      console.log(newdata[0].cards);
      templateVars.homeCards = newdata[0].cards;
    })
    .then(() => {
      return res.render('index', templateVars);
    })
  // res.render('index', templateVars);
});

// http://www.globaltourcreatives.com/api/?get=home

rp(config.gtc.homeToursPage)
  .then(data => {
    console.log(data);
  });





module.exports = router;
