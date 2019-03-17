class LoadingHandler {
  constructor() {
    this.initAOS = false;
    this.didInit = false;
    this.DOM = {
      container: document.getElementById('loading'),
      allSections: Array.from(document.getElementsByClassName('belongs-page')),
      home: [],
      about: [],
      contact: [],
    };
    this.getPageSections();
    this.hideLoading = this.hideLoading.bind(this);
  }
  getPageSections() {
    const pagesArray = ['home', 'about', 'contact'];
    this.DOM.allSections.forEach(thisSection => {
      for (var i = 0; i < pagesArray.length; i++) {
        const thisPage = pagesArray[i];
        if (thisSection.classList.contains(`belongs-page--${thisPage}`)) {
          this.DOM[thisPage].push(thisSection);
          break;
        }
      }
    });
  }
  changePageTitle(pageName) {
    if (!pageName) {
      pageName = 'home';
    }
    let newTitle = `GTC | ${pageName.toUpperCase()}`;
    return document.title = newTitle;
  }
  hidePages() {
    this.DOM.allSections.forEach(
      function(el) {
        el.style.display = 'none';
      }
    );
  }
  showPage(pageName) {
    let defaultPage = 'home';
    if (!this.DOM[pageName]) {
      pageName = defaultPage;
    }
    this.DOM[pageName].forEach(
      function(el) {
        el.style.display = '';
      }
    );
  }
  hideLoading() {
    this.DOM.container.classList.remove('loading--in');
  }
  showLoading() {
    this.DOM.container.classList.add('loading--in');
  }
  init() {
    setTimeout(() => {
      this.didInit = true;
      deferAOS();
      deferAnimate();
      deferParallax();
      this.hideLoading();
      setTimeout(() => GTC_STATE.selectQueuedCard(), 500);
    }, 4000);
  }
}
var loadingHandler = new LoadingHandler();

var stateObj = {};
function makeNavFn(newEndpoint) {
  if (!newEndpoint) {
    newEndpoint = '';
  }
  return function(e) {
    e.preventDefault();
    history.pushState(stateObj, `${newEndpoint || 'home'} title`, `/${newEndpoint}`);
    GTC_ROUTER.navigate();
  }
}
function bindNav(pageName) {
  document.getElementById(`drawer-${pageName}`).onclick = makeNavFn(pageName);
  document.getElementById(`header-${pageName}`).onclick = makeNavFn(pageName);
}
document.getElementById('header-logo').onclick = makeNavFn();
document.getElementById('drawer-home').onclick = makeNavFn();
['about', 'contact'].forEach(function(navItem) {
  bindNav(navItem);
});
