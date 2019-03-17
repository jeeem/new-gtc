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
  console.log('newData', newData);
  return newData;
};

_HELPERS.createCardMarkup = function(data) {
  data = _HELPERS.transformTourResponse(data);
  return `<div class="card"
    data-print-items='${JSON.stringify(data.printItems)}'
    data-tv-spots='${JSON.stringify(data.tvSpots)}'
    data-radio-spots='${JSON.stringify(data.radioSpots)}'
    data-tourid="${data.tourID}"
  >
    <div class="product__bg"></div>
    <div class="card__top">
      <img
        src="${data.printItems[0].thumbnailURL}"
        data-src="${data.printItems[0].thumbnailURL}"
        class="card__img loaded"/>
    </div>

    <div
      class="card__bottom">
      <h3 class="card-subtext animated">${data.subTitle}</h3>
      <h2 class="card-title animated fast">${data.tourName}</h2>
      <div class="card-button animated faster">View Project</div>
      <div
        class="card-blur"
        style="background-image: url(${data.printItems[0].thumbnailURL})"></div>
        <div class="card-filter"></div>
    </div>
  </div>`;
};
