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
router.get('/id/:string', function(req, res, next) {
  console.log('LOOKING FOR TOUR BY ID');
  var tourURL = 'http://www.globaltourcreatives.com/api/?get=details&tourID=' + req.params.string;
  request(tourURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response.
    return res.json(body);
  });
});

router.get('/search/:string', function(req, res, next) {
  var searchURL = 'http://www.globaltourcreatives.com/api/?get=search&var=' + req.params.string;
  request(searchURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response.
    return res.json(body);
  });
});

router.get('/*', function(req, res, next) {
  var templateVars = {
    title: 'GTC | ',
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
  templateVars.title = templateVars.title + initialPage.toUpperCase();
  templateVars[`page${initialPage}`] = true;
  var promiseArray = [];
  rp(config.gtc.homeToursPage)
    .then(data => {
      let newdata = JSON.parse(data);
      console.log(newdata[0].cards);
      templateVars.homeCards = newdata[0].cards;
      newdata[0].cards.forEach(item => {
        promiseArray.push(new Promise((resolve, reject) => {
          return resolve(rp({ uri: `http://www.globaltourcreatives.com/api/?get=details&tourID=${item.tourID}`, json: true }));
        }));
      });
      return Promise.all(promiseArray).then(values => {
        console.log('ALL PROMISES RESOLVED VALUES =', values)
        return values;
      })
      .then(valuesArray => {
        newdata[0].cards.forEach((item, index) => {
          let thisCard = newdata[0].cards[index];
          let thisSpotsArray = valuesArray[index];
          thisSpotsArray.forEach(spotsItem => {
            if (spotsItem.tvSpots) {
              return thisCard.tvSpots = spotsItem.tvSpots;
            }
            if (spotsItem.radioSpots) {
              return thisCard.radioSpots = spotsItem.radioSpots;
            }
            if (spotsItem.printItems) {
              return thisCard.printItems = spotsItem.printItems;
            }
            if (!thisCard.subTitle && thisCard.subTitle !== false) {
              let parsedName = utils.parseTourName(thisCard.tourName.toUpperCase());
              thisCard.tourName = parsedName.parsed ? parsedName.title : thisCard.tourName.toUpperCase();
              thisCard.subTitle = parsedName.parsed ? parsedName.subTitle : false;
            }
          });
        });
        templateVars.homeCards = newdata[0].cards;
      });
    })
    .then(() => {
      return res.render('index', templateVars);
    });
  // res.render('index', templateVars);
});

module.exports = router;
