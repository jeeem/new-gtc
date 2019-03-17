function makeParallaxFn(domNode) {
  return function() {
  	var yPos = domNode.getBoundingClientRect().top / 9;
  	yPos = -yPos;

  	var coords = 'center '+ yPos + 'px';
  	domNode.style.backgroundPosition = coords;
  }
}

class ParallaxManager {
  constructor() {
    this.nodes = Array.from(document.getElementsByClassName('parallax'));
    this.fnRefs = [];
    this.createOne = this.createOne.bind(this);
    this.executeAll = this.executeAll.bind(this);
    this.executeOne = this.executeOne.bind(this);
    this.throttled = _.throttle(this.executeAll, 32);
  }
  createOne(element, index) {
    if (!_HELPERS.isHidden(element)) {
      this.fnRefs.push(makeParallaxFn(element));
    }
    // this.fnRefs[index] = makeParallaxFn(element);
  }
  createHandlers() {
    this.nodes.forEach(this.createOne);
  }
  executeOne(fn) {
    return requestAnimationFrame(fn);
  }
  executeAll() {
    this.fnRefs.forEach(this.executeOne);
  }
  startWatching() {
    if (this.fnRefs.length) {
      window.addEventListener("scroll", this.throttled);
      this.throttled();
    }
  }
  stopWatching() {
    if (this.fnRefs.length) {
      window.removeEventListener("scroll", this.throttled);
    }
  }
  restart() {
    this.stopWatching();
    this.fnRefs = [];
    this.init();
  }
  init() {
    this.createHandlers();
    this.startWatching();
  }
}
var parallaxManager = new ParallaxManager();
parallaxManager.init();
