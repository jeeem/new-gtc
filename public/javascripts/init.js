// init app here

// landing on tour page
GTC_ROUTER.subscribe(data => {
  if (data.previous) {
    return GTC_ROUTER.unsubscribe('land-on-tour');
  }
  if (data.current.page === 'tour') {
    let extractedId = _HELPERS.lastWordOfSlug(data.current.query);
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
          console.log('fetch response');
          console.log(myJson);
          var cardNode = _HELPERS.htmlToElement(_HELPERS.createCardMarkup(myJson));
          console.log(cardNode);
          GTC_DOM.grid.append(GTC_DOM.grid.firstElementChild);
          GTC_DOM.grid.prepend(cardNode);
          GTC_ITEMS.push(new Item(cardNode));
          return setTimeout(() => {
            return cardNode.click();
          }, 1000);
        });
    }
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
    if (loadingHandler.didInit) {
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

GTC_ROUTER.init()
loadingHandler.init();
