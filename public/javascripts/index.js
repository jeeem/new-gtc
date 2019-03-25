function createAndAppend(arrayOfStrings) {
  var parentContainer = document.getElementById('search-results');
  var innerString = arrayOfStrings.join('');
  let resultLink = _HELPERS.stripHtml(innerString);
  resultLink = resultLink.slice(0, resultLink.length - 7);
  innerString = innerString.replace(/\s/g, '&nbsp;');
  var itemString = `<a href="/tour/${_HELPERS.slugify(resultLink)}" class="search-results__item">${innerString}</a>`;
  var newNode = _HELPERS.htmlToElement(itemString);
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
    `http://www.globaltourcreatives.com/api/?get=search&var=${event.target.value}`,
    {
      method: 'GET',
      mode: 'cors'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      populateSearchResults(JSON.stringify(myJson), event.target.value);
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
    this.DOM.message = document.getElementById('mailBody');
    this.DOM.button = document.getElementById('mailButton');

    this.updateHref = this.updateHref.bind(this);
    this.DOM.button.onclick = this.updateHref;
    this.data = {};
  }
  updateData() {
    this.data.name = this.DOM.name.value;
    this.data.email = this.DOM.email.value;
    this.data.message = this.DOM.message.value;
  }
  updateHref(e) {
    e.preventDefault();
    this.data.name = this.DOM.name.value;
    this.data.email = this.DOM.email.value;
    this.data.message = this.DOM.message.value;
    console.log('sending email to http://www.globaltourcreatives.com/api/?post=contactForm', this.data);
    window.fetch(
      `http://www.globaltourcreatives.com/api/?post=contactForm`,
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(this.data)
      })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log('response from email server ', myJson);
        return myJson;
      })
      .catch(err => {
        console.log(err);
      });
      this.DOM.name.classList.add('disabled');
      this.DOM.email.classList.add('disabled');
      this.DOM.message.classList.add('disabled');
      this.DOM.button.classList.add('sent');
      this.DOM.button.innerHTML = `THANKS, WE'll BE IN TOUCH`;
  }
}
const mailHandler = new MailHandler();
