/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
function createAndAppend(arrayOfStrings) {

  var parentContainer = document.getElementById('search-results');
  var innerString = arrayOfStrings.join('');
  let resultLink = stripHtml(innerString);
  resultLink = resultLink.slice(0, resultLink.length/2);
  console.log('innerString', innerString, stripHtml(innerString));
  innerString = innerString.replace(/\s/g, '&nbsp;');
  var itemString = `<a href="/tour/${resultLink}" target="_blank" class="search-results__item">${innerString}</a>`;
  var newNode = htmlToElement(itemString);
  parentContainer.appendChild(newNode);
}
function populateSearchResults(resultsArray, searchString) {
  resultsArray = JSON.parse(resultsArray);
  var resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';
  if (!resultsArray) {
    return resultsContainer.innerHTML = '';
  }
  resultsArray = resultsArray.filter(function(result) {
      return !!result.tourName;
    }
  );
  resultsArray = resultsArray.map(function(item) {
    return item.tourName;
  });
  var searchResults = _SearchUtil.caseInsensitiveSearch(
    resultsArray,
    searchString,
    function(matchedSubstring) {
      return `<b>${matchedSubstring}</b>`;
    },
    function(unmatchedSubString) {
      return `<span>${unmatchedSubString}</span>`;
    }
  );
  searchResults.forEach(function(item) {
    if (item.isMatch) {
      return createAndAppend(item.transformedValue);
    }
  });
}

function changeEventHandler(event) {
  if (!event.target.value) {
    return populateSearchResults(null);
  }
  return window.fetch(
    `/search/${event.target.value}`,
    {
      method: 'GET',
      mode: 'same-origin'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      populateSearchResults(myJson, event.target.value);
    });
}

document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('fixed-header-drawer-exp').onchange=changeEventHandler;
    document.getElementById('fixed-header-drawer-exp').onkeydown=changeEventHandler;
}, false);

var fullVideoHandler = {
  playSVG: '<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z"/>',
  pauseSVG: '<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-3v-10h3v10zm5 0h-3v-10h3v10z"/>',
  fullVideo: document.getElementById('fullVideo'),
  fullVideoContainer: document.getElementById('fullVideoContainer'),
  videoPlayButton: document.getElementById('fullVideoPlay'),
  fullVideoPlaying: false,
  isPlaying: function() {
    this.videoPlayButton.innerHTML = this.pauseSVG;
    this.fullVideoPlaying = true;
    this.fullVideoContainer.classList.add('isPlaying');
  },
  notPlaying: function() {
    this.videoPlayButton.innerHTML = this.playSVG;
    this.fullVideoPlaying = false;
    this.fullVideoContainer.classList.remove('isPlaying');
  },
  toggleFullVideo: function(e) {
    if (this.fullVideoPlaying) {
      this.notPlaying();
      return this.fullVideo.pause();
    }
    this.isPlaying();
    return this.fullVideo.play();
  },
  init: function() {
    this.fullVideo.addEventListener('ended', this.notPlaying.bind(this));
    this.videoPlayButton.addEventListener('click', this.toggleFullVideo.bind(this));
  }
};
fullVideoHandler.init();

class MailHandler {
  constructor() {
    this.DOM = {};
    this.DOM.name = document.getElementById('mailName');
    this.DOM.email = document.getElementById('mailEmail');
    this.DOM.body = document.getElementById('mailBody');
    this.DOM.button = document.getElementById('mailButton');

    this.DOM.name.onchange = () => this.updateData();
    this.DOM.email.onchange = () => this.updateData();
    this.DOM.body.onchange = () => this.updateData();
    this.data = {};
  }
  updateData() {
    this.data.name = this.DOM.name.value;
    this.data.email = this.DOM.email.value;
    this.data.body = this.DOM.body.value;
    this.updateHref();
  }
  updateHref() {
    this.DOM.button.href = `mailto:russ@gtc.co?cc=${this.data.email}&subject=${this.data.name} | GTC&body=${this.data.message}`;
  }
}
const mailHandler = new MailHandler();
