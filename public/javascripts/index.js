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
  resultLink = resultLink.slice(0, resultLink.length - 7);
  innerString = innerString.replace(/\s/g, '&nbsp;');
  var itemString = `<a href="/tour/${slugify(resultLink)}" class="search-results__item">${innerString}</a>`;
  var newNode = htmlToElement(itemString);
  var tourID = newNode.querySelector('p').innerHTML;
  newNode.href = newNode.href + tourID;
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
  newResultsArray = resultsArray.map(function(item) {
    return item.tourName;
  });
  var searchResults = _SearchUtil.caseInsensitiveSearch(
    newResultsArray,
    searchString,
    function(matchedSubstring) {
      return `<b>${matchedSubstring}</b>`;
    },
    function(unmatchedSubString) {
      return `<span>${unmatchedSubString}</span>`;
    }
  );
  if (!searchResults) {
    return;
  }
  searchResults.forEach(function(item, thisIndex) {
    if (item.isMatch) {
      item.transformedValue.push(`<p>-${resultsArray[thisIndex].tourID}</p>`);
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
    document.getElementById('fixed-header-drawer-exp').onkeyup=changeEventHandler;
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
    document.getElementById('aboutServicesLeft').pause();
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

var aboutServicesLeftVideo = document.getElementById('aboutServicesLeft');
aboutServicesLeftVideo.onplay = () => {
  if (fullVideoHandler.fullVideoPlaying) {
    fullVideoHandler.notPlaying();
    fullVideoHandler.fullVideo.pause();
  }
};

class MailHandler {
  constructor() {
    this.DOM = {};
    this.DOM.name = document.getElementById('mailName');
    this.DOM.email = document.getElementById('mailEmail');
    this.DOM.body = document.getElementById('mailBody');
    this.DOM.button = document.getElementById('mailButton');

    this.updateHref = this.updateHref.bind(this);
    this.DOM.button.onclick = this.updateHref;
    this.data = {};
  }
  updateData() {
    this.data.name = this.DOM.name.value;
    this.data.email = this.DOM.email.value;
    this.data.body = this.DOM.body.value;
  }
  updateHref(e) {
    e.preventDefault();
    this.data.name = this.DOM.name.value;
    this.data.email = this.DOM.email.value;
    this.data.body = this.DOM.body.value;
    window.fetch(
      `/email/`,
      {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(this.data)
      })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        return myJson;
      })
      .catch(err => {
        console.log(err);
      });
      this.DOM.name.classList.add('disabled');
      this.DOM.email.classList.add('disabled');
      this.DOM.body.classList.add('disabled');
      this.DOM.button.classList.add('sent');
      this.DOM.button.innerHTML = `THANKS, WE'll BE IN TOUCH`;
  }
}
const mailHandler = new MailHandler();
