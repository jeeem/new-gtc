var _HELPERS = {};


_HELPERS.stopAllVideos = function() {
  let vidyas = document.querySelectorAll('video');
  Array.from(vidyas).forEach(vidya => {
    vidya.pause();
    vidya.currentTime = 0;
  });
};

_HELPERS.stopAllAudio = function() {
  let audyas = document.querySelectorAll('audio');
  Array.from(audyas).forEach(audya => {
    audya.pause();
    audya.currentTime = 0;
  });
};

_HELPERS.DAY_IN_MS = 1000 * 60 * 60 * 24;

_HELPERS.storeWithExpiration = {
	set: function(key, val, exp) {
		store.set(key, { val:val, exp:exp, time:new Date().getTime() })
	},
	get: function(key) {
		var info = store.get(key)
		if (!info) { return null }
		if (new Date().getTime() - info.time > info.exp) { return null }
		return info.val
	}
};
var offscreenAmt = window.matchMedia("(min-width: 751px)").matches ? 750 : 1500;
_HELPERS.isInViewport = function (elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top <= ((window.innerHeight || document.documentElement.clientHeight) + offscreenAmt)
	);
};

/*!
 * Apply a CSS animation to an element
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
 // flag will toggle after animation.css loads
_HELPERS.animationsAvailable = false;
_HELPERS.animate = function(elem, animation, hide) {
  // If there's no element or animation, do nothing
  if (!elem || !animation) return;
  // Remove the [hidden] attribute
  elem.removeAttribute('hidden');
  // Apply the animation
  elem.classList.add(animation);
  // Detect when the animation ends
  elem.addEventListener('animationend', function endAnimation (event) {
    // Remove the animation class
    elem.classList.remove(animation);
    // If the element should be hidden, hide it
    if (hide) {
      elem.setAttribute('hidden', 'true');
    }
    // Remove this event listener
    elem.removeEventListener('animationend', endAnimation, false);
  }, false);
};
// define tobi, sometimes override Tobi instance in card grid
var tobi;

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
_HELPERS.htmlToElement = function(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

_HELPERS.stripHtml = function(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
};

_HELPERS.slugify = function(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

_HELPERS.lastWordOfSlug = function(slugifiedWords) {
  var n = slugifiedWords.split("-");
  return n[n.length - 1];
};

//Where el is the DOM element you'd like to test for visibility
_HELPERS.isHidden = function(el) {
    return (el.offsetParent === null)
};

_HELPERS.materializeHandlers = null;
_HELPERS.materializeReady = false;

_HELPERS.getMaterialize = function() {
  _HELPERS.materializeHandlers = document.getElementsByClassName('mdl-layout');
  if (
    _HELPERS.materializeHandlers.length
    && _HELPERS.materializeHandlers[0].MaterialLayout
    && _HELPERS.materializeHandlers[0].MaterialLayout.toggleDrawer
  ) {
    _HELPERS.materializeHandlers = _HELPERS.materializeHandlers[0].MaterialLayout;
    _HELPERS.materializeReady = true;
    return true;
  }
  return false;
};

_HELPERS.closeDrawer = function() {
  if (!_HELPERS.materializeReady && !_HELPERS.getMaterialize()) {
    return;
  }
  if (_HELPERS.materializeHandlers.drawer_.classList.contains('is-visible')) {
    _HELPERS.materializeHandlers.toggleDrawer();
  }
}

// filter API info object and merge array of detail objects
_HELPERS.mergeDetails = function(detailsArray) {
  var flattenedDetails = _.assign({}, ...detailsArray);
  return flattenedDetails;
};

// try to parse artist name + tour/year
_HELPERS.parseTourName = function(tourName) {
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
};

_HELPERS.transformTourResponse = function(data) {
  var newData = _HELPERS.mergeDetails(data);
  newData.subTitle = '';
  let parsedName = _HELPERS.parseTourName(newData.tourName);
  if (parsedName.parsed) {
    newData.tourName = parsedName.title;
    newData.subTitle = parsedName.subTitle;
  }
  return newData;
};

_HELPERS.createCardMarkup = function(data) {
  if (!data.tourID) {
    data = _HELPERS.transformTourResponse(data);
  }
  let wideClass = "";
  let loadedClass = "";
  let imageUrl = null;
  if (data.isWide) {
    imageUrl = data.wideCardSrc;
    wideClass = " card--large";
  } else if (data.cardSrc) {
    imageUrl = data.cardSrc;
  } else {
    imageUrl = data.printItems[0].thumbnailURL;
    loadedClass = " loaded";
  }
  return `<div class="card${wideClass}"
    data-print-items='${data.printItems ? JSON.stringify(data.printItems) : ''}'
    data-tv-spots='${data.tvSpots ? JSON.stringify(data.tvSpots) : ''}'
    data-radio-spots='${data.radioSpots ? JSON.stringify(data.radioSpots) : ''}'
    data-tourid="${data.tourID}"
  >
    <div class="product__bg"></div>
    <div class="card__top">
      <img
        data-page="home"
        data-src="${imageUrl}"
        class="gtc-lazyload card__img${loadedClass}"/>
    </div>

    <div
      class="card__bottom">
      <h3 class="card-subtext animated">${data.subTitle}</h3>
      <h2 class="card-title animated fast">${data.tourName}</h2>
      <div class="card-button animated faster">View Project</div>
      <div
        class="card-blur gtc-lazyload"
        data-bg="${imageUrl}"
        data-page="home"></div>
        <div class="card-filter"></div>
    </div>
  </div>`;
};

_HELPERS.getFallbackCards = function() {
  console.log('oops! something went wrong - getting fallback cards');
  return GTC_STATE.CARDS.FALLBACK;
};

_HELPERS.cardSrcId = function(cardSrcURL) {
  var arr = cardSrcURL.match(/token=(.*)/);
  if (arr != null) { // Did it match?
    return(arr[1]);
  }
  return false;
};
_HELPERS.getHomepageCards = function() {
  const CACHED_CARDS = _HELPERS.storeWithExpiration.get('HOME_CARDS');
  if (CACHED_CARDS) {
    console.log('retrieved cards from cache');
    return Promise.resolve(CACHED_CARDS);
  }
  return window.fetch(
    `http://www.globaltourcreatives.com/api/?get=home`,
    {
      method: 'GET',
      mode: 'cors'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(newdata) {
      let promiseArray = [];
      newdata[0].cards.forEach(item => {
        promiseArray.push(new Promise((resolve, reject) => {
          return window.fetch(
            `http://www.globaltourcreatives.com/api/?get=details&tourID=${item.tourID}`,
            {
              method: 'GET',
              mode: 'cors'
            })
            .then(function(response) {
              return response.json();
            })
            .then(function(newData) {
              return resolve(newData);
            })
            .catch(function(error) {
              return reject(error);
            });
        }));
      });
      return Promise.all(promiseArray).then(values => {
        return values;
      }).then(valuesArray => {
        newdata[0].cards.forEach((thisCard, index) => {
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
              let parsedName = _HELPERS.parseTourName(thisCard.tourName.toUpperCase());
              thisCard.tourName = parsedName.parsed ? parsedName.title : thisCard.tourName.toUpperCase();
              thisCard.subTitle = parsedName.parsed ? parsedName.subTitle : false;
            }
          });
          if (
            index === 2
            || index === 3
            || index === 8
            || index === 9
          ) {
            thisCard.isWide = true;
          }
          thisCard.wideCardSrc = `http://52.87.249.145:3000/proxy/${_HELPERS.cardSrcId(thisCard.wideCardSrc)}`;
          thisCard.cardSrc = `http://52.87.249.145:3000/proxy/${_HELPERS.cardSrcId(thisCard.cardSrc)}`;
        });
        return newdata[0].cards;
      });
    }).catch(error => {
      return _HELPERS.getFallbackCards();
    });
};
