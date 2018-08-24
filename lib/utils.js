var _ = require('lodash');

var config = require('../config');

var utils = {
  slugToWords:  function(currentPath) {
    return _.replace(currentPath, /-/g, ' ');
  },

  createSearchURL:  function(searchString) {
    return `${config.gtc.searchURL}${searchString}`;
  },

  createDetailsURL: function(tourID) {
    return `${config.gtc.tourDetailsURL}${tourID}`;
  },

  // render homepage by default
  renderDefault: function(expressResponseHandler) {
    return expressResponseHandler.render('index', { title: 'GTC | HOME', pagehome: true });
  },

  // filter API info object
  filterResponse: function(responseArray) {
    responseArray = JSON.parse(responseArray);
    var filteredArray = _.filter(responseArray,
      function(o) {
        return !o.Owner || !o.Contact || !o['API Version'];
      }
    );
    return filteredArray;
  },

  // filter API info object and merge array of detail objects
  mergeDetails: function(detailsArray) {
    var filteredDetails = this.filterResponse(detailsArray);
    var flattenedDetails = _.assign({}, ...filteredDetails);
    return flattenedDetails;
  },

  // try to parse artist name + tour/year
  parseTourName: function(tourName) {
    let parseResults = {
      parsed: false,
      title: null,
      subTitle: null
    };
    function wasParsed(splitString) {
      parseResults.parsed = true;
      parseResults.title = splitString[0];
      parseResults.subTitle = splitString[1];
    }
    let artistAndTour = tourName.split(' - ');
    if (artistAndTour.length === 2) {
      wasParsed(artistAndTour);
      return parseResults;
    }
    let artistAndYear = tourName.split(' 20');
    if (artistAndYear.length === 2) {
      artistAndYear[1] = `${'20'}${artistAndYear[1]}`;
      wasParsed(artistAndYear);
    }
    return parseResults;
  }
};


module.exports = utils;
