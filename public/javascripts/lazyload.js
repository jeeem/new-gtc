class LazyLoad {
  constructor() {
    this.lazyLoadNodes = {
      home: [],
      about: [],
      contact: []
    };
    this.loadInView = this.loadInView.bind(this);
    this.throttled = _.throttle(this.loadInView, 66);
  }
  addNewNode(node) {
    this.lazyLoadNodes[node.dataset.page].push(node);
  }
  loadInView() {
    let currentPage = GTC_ROUTER.currentNavObject.page !== 'tour' ? GTC_ROUTER.currentNavObject.page : 'home';
    if (
      !this.lazyLoadNodes[currentPage]
      || !this.lazyLoadNodes[currentPage].length
    ) {
      return;
    }
    this.lazyLoadNodes[currentPage].forEach(el => {
      if (_HELPERS.isInViewport(el)) {
        this.loadNode(el);
      }
    });
  }
  init() {
    let newNodes = Array.from(document.getElementsByClassName('gtc-lazyload'));
    newNodes.forEach(thisNode => {
      return this.addNewNode(thisNode);
    });
    window.addEventListener("scroll", this.throttled);
  }
  loadPage(page) {
    if (!this.lazyLoadNodes[page].length) {
      return;
    }
    this.lazyLoadNodes[page].forEach(node => {
      if (_HELPERS.isInViewport(node)) {
        return this.loadNode(node);
      }
    });
  }
  loadNode(node) {
    if (node.classList.contains('gtc-lazyload--loaded')) {
      return;
    }
    if (node.dataset.src) {
      node.src = node.dataset.src;
    } else if (node.dataset.poster) {
      node.poster = node.dataset.poster;
    } else if (node.dataset.bg) {
      node.style.backgroundImage = `url("${node.dataset.bg}")`;
    }
    node.classList.add('gtc-lazyload--loaded');
  }
}
var GTC_LAZY_LOAD = new LazyLoad();
