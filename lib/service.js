var rp = require('request-promise-native');

var config = require('../config');
var utils = require('./utils');

function getHomepageCards() {
  return rp(config.gtc.homeToursPage)
    .then(data => {
      let newdata = JSON.parse(data);
      let promiseArray = [];
      newdata[0].cards.forEach(item => {
        promiseArray.push(new Promise((resolve, reject) => {
          return resolve(rp({ uri: `http://www.globaltourcreatives.com/api/?get=details&tourID=${item.tourID}`, json: true }));
        }));
      });
      return Promise.all(promiseArray).then(values => {
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
        return newdata[0].cards;
      });
    });
}

module.exports = getHomepageCards;
