function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

class LoadingHandler {
  constructor() {
    this.initAOS = false;
    this.DOM = {
      container: document.getElementById('loading'),
      home: Array.from(document.getElementsByClassName('belongs-page--home')),
      about: Array.from(document.getElementsByClassName('belongs-page--about')),
      contact: Array.from(document.getElementsByClassName('belongs-page--contact')),
    }
    this.hideLoading = this.hideLoading.bind(this);
    this.init();
  }
  changePageTitle(pageName) {
    if (!pageName) {
      pageName = 'home';
    }
    let newTitle = `GTC | ${pageName.toUpperCase()}`;
    return document.title = newTitle;
  }
  hidePages() {
    Array.from(document.getElementsByClassName('belongs-page')).forEach(
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
    if (pageName === 'about' && !this.initAOS) {
      this.initAOS = true;
      AOS.init();
    }
  }
  hideLoading() {
    this.DOM.container.classList.remove('loading--in');
  }
  showLoading() {
    this.DOM.container.classList.add('loading--in');
  }
  init() {
    if (this.DOM.about[0].style.display !== 'none') {
      this.initAOS = true;
      AOS.init();
    }
    if (this.DOM.container.classList.contains('loading--in')) {
      setTimeout(this.hideLoading, 3000);
    }
  }
  checkDone(nextPage) {
    // check if we even ready to remove loading icon here
    this.hidePages();
    this.changePageTitle(nextPage);
    this.showPage(nextPage);
    parallaxManager.restart();
    setTimeout(this.hideLoading, 800);
  }
}
var loadingHandler = new LoadingHandler();

function closeDrawer() {
  var materializeHandlers = document.getElementsByClassName('mdl-layout')[0].MaterialLayout;
  if (materializeHandlers.drawer_.classList.contains('is-visible')) {
    materializeHandlers.toggleDrawer();
  }
}

function toggleDrawer() {
  var materializeHandlers = document.getElementsByClassName('mdl-layout')[0].MaterialLayout;
  materializeHandlers.toggleDrawer();
}

var stateObj = {};
function makeNavFn(newEndpoint) {
  if (!newEndpoint) {
    newEndpoint = '';
  }
  return function(e) {
    e.preventDefault();
    stopAllVideos();
    loadingHandler.showLoading();
    history.pushState(stateObj, `${newEndpoint || 'home'} title`, `/${newEndpoint}`);
    loadingHandler.checkDone(newEndpoint || 'home');
    closeDrawer();
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
