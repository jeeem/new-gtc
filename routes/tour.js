var express = require('express');
var request = require('request');
var router = express.Router();

var utils = require('../lib/utils');

/* GET individual tour page. */
router.get('/:string', function(req, res, next) {
  // turn slug into words to query API
  var transformedSlug = utils.slugToWords(req.params.string);
  if (!transformedSlug) {
    return utils.renderDefault(res);
  }

  // search for a tour name using URL slug
  var searchURL = utils.createSearchURL(transformedSlug);
  return request(searchURL, function (error, response, body) {
    if (error) {
      return utils.renderDefault(res);
    }
    // filter API info object
    var bodyJSON = utils.filterResponse(body);
    if (!bodyJSON.length) {
      return utils.renderDefault(res);
    }
    // if we have matching result, query for details
    var detailsURL = utils.createDetailsURL(bodyJSON[0].tourID)
    return request(detailsURL, function (detailsError, detailsResponse, detailsBody) {
      if (detailsError) {
        return utils.renderDefault(res);
      }
      // filter API info object and merge array of detail objects
      var detailsBodyJSON = utils.mergeDetails(detailsBody);
      console.log('detailsBodyJSON', detailsBodyJSON);
      if (!detailsBodyJSON) {
        return utils.renderDefault(res);
      }
      // finally render page
      let parsedName = utils.parseTourName(detailsBodyJSON.tourName.toUpperCase());
      return res.render('index',
        {
          title: `GTC | ${detailsBodyJSON.tourName.toUpperCase()}`,
          tour: parsedName.parsed ? parsedName.title : detailsBodyJSON.tourName.toUpperCase(),
          subTitle: parsedName.parsed ? parsedName.subTitle : '',
          pagehome: true,
          showtour: true,
          tvSpots: detailsBodyJSON.tvSpots,
          printItems: detailsBodyJSON.printItems,
          radioSpots: detailsBodyJSON.radioSpots,
          mainImage: detailsBodyJSON.printItems[0].thumbnailURL
        });
    });
  });
});

module.exports = router;
