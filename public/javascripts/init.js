// init app here

window.onpopstate = function(event) {
  if (GTC_ROUTER.currentNavObject.page === 'tour') {
    GTC_DOM.details.DOM.close.click();
  }
  GTC_ROUTER.navigate();
};

// landing on tour page
GTC_ROUTER.subscribe(data => {
  if (data.previous) {
    return GTC_ROUTER.unsubscribe('land-on-tour');
  }
  if (data.current.page === 'tour') {
    let extractedId = _HELPERS.lastWordOfSlug(data.current.query);
    GTC_STATE.addSingleTour(extractedId);
  } else {
    return GTC_ROUTER.unsubscribe('land-on-tour');
  }
}, 'land-on-tour');

// home / tour page nav
GTC_ROUTER.subscribe(data => {
  const isActuallyHome = data.current.page === 'home';
  if (data.current.page !== 'tour' && !isActuallyHome) {
    return;
  }
  let previousIsHome = false;
  if (data.previous) {
    previousIsHome = data.previous.page === 'tour' || data.previous.page === 'home';
    if (!previousIsHome) {
      loadingHandler.hidePages();
    }
  }
  if (isActuallyHome) {
    loadingHandler.changePageTitle('home');
    if (loadingHandler.didInit && !previousIsHome) {
      loadingHandler.showLoading();
      setTimeout(() => loadingHandler.hideLoading(), 800);
      _HELPERS.closeDrawer();
    }
  }
  loadingHandler.showPage('home');
}, 'home-nav');

// about page nav
GTC_ROUTER.subscribe(data => {
  if (data.current.page !== 'about') {
    return;
  }
  if (data.previous && data.previous.page !== 'about') {
    loadingHandler.hidePages();
  }
  loadingHandler.changePageTitle('about');
  loadingHandler.showPage('about');
  _HELPERS.closeDrawer();
  if (loadingHandler.didInit) {
    loadingHandler.showLoading();
    setTimeout(() => loadingHandler.hideLoading(), 800);
  }
}, 'about-nav');

// init about page animations
GTC_ROUTER.subscribe(data => {
  if (data.current.page !== 'about') {
    return;
  }
  if (!loadingHandler.initAOS && typeof AOS !== 'undefined') {
    loadingHandler.initAOS = true;
    AOS.init();
    GTC_ROUTER.unsubscribe('init-aos');
  }
}, 'init-aos');

// contact page nav
GTC_ROUTER.subscribe(data => {
  if (data.current.page !== 'contact') {
    return;
  }
  if (data.previous && data.previous.page !== 'contact') {
    loadingHandler.hidePages();
  }
  loadingHandler.changePageTitle('contact');
  loadingHandler.showPage('contact');
  _HELPERS.closeDrawer();
  if (loadingHandler.didInit) {
    loadingHandler.showLoading();
    setTimeout(() => loadingHandler.hideLoading(), 800);
  }
}, 'contact-nav');

// turn off videos when navigating
GTC_ROUTER.subscribe(data => {
  if (fullVideoHandler.fullVideoPlaying) {
    fullVideoHandler.notPlaying();
    fullVideoHandler.fullVideo.pause();
  }
  _HELPERS.stopAllVideos();
}, 'stop-videos');

// restart parallax manager
GTC_ROUTER.subscribe(data => {
  if (typeof parallaxManager !== 'undefined') {
    parallaxManager.restart();
  }
}, 'restart-parallax');

// lazyload change page
GTC_ROUTER.subscribe(data => {
  let currentPage = data.current.page !== 'tour' ? data.current.page : 'home';
  GTC_LAZY_LOAD.loadPage(currentPage);
}, 'lazy-load-nav');

// fetched all homepage cards, add them to dom
GTC_STATE.subscribe(pubObj => {
  if (pubObj.type !== GTC_STATE.PUBLISH_ACTIONS.ADD_HOME) {
    return;
  }
  if (!_HELPERS.storeWithExpiration.get('HOME_CARDS')) {
    _HELPERS.storeWithExpiration.set('HOME_CARDS', pubObj.data, _HELPERS.DAY_IN_MS);
  }
  pubObj.data.forEach(cardJson => {
    var cardNode = _HELPERS.htmlToElement(_HELPERS.createCardMarkup(cardJson));
    GTC_DOM.grid.append(cardNode);
  });
  GTC_DOM.gridItems = Array.from(GTC_DOM.grid.querySelectorAll('.card'));
  let GTC_ITEMS = [];
  GTC_DOM.gridItems.forEach(item => GTC_ITEMS.push(new Item(item)));
});

// we're at an individual tour page
// either select tour if its on page, or add new card to DOM
GTC_STATE.subscribe(pubObj => {
  if (pubObj.type !== GTC_STATE.PUBLISH_ACTIONS.ADD_SINGLE_TOUR) {
    return;
  }
  const extractedId = pubObj.data;
  if (GTC_STATE.hasLoadedCard(extractedId)) {
    var cardNode = document.querySelector('[data-tourid="' + extractedId + '"]');
    GTC_STATE.addQueuedCard(cardNode);
  } else {
    return window.fetch(
      `http://www.globaltourcreatives.com/api/?get=details&tourID=${extractedId}`,
      {
        method: 'GET',
        mode: 'cors'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        var cardNode = _HELPERS.htmlToElement(_HELPERS.createCardMarkup(myJson));
        GTC_DOM.grid.append(GTC_DOM.grid.firstElementChild);
        GTC_DOM.grid.prepend(cardNode);
        GTC_ITEMS.push(new Item(cardNode));
        return setTimeout(() => {
          return cardNode.click();
        }, 1000);
      })
      .catch(error => {
        console.log(`could not find tour with ID ${extractedId}`);
        history.pushState(stateObj, `home title`, `/`);
      });
  }
});

_HELPERS.getHomepageCards().then(data => {
  GTC_STATE.addHomeCards(data);
  GTC_LAZY_LOAD.init();
  GTC_ROUTER.init()
  loadingHandler.init();
});
