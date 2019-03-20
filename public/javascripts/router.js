class GTCRouter {
  constructor() {
    this.subscribers = [];
    this.unsubscribeQueue = [];
    this.previousRoute = null;
    this.previousNavObject = null;
    this.currentRoute = document.location.pathname;
    this.currentNavObject = this.createNavObject();
  }
  subscribe(cb, identifier) {
    this.subscribers.push({
      id: identifier,
      callback: cb
    });
  }
  unsubscribe(identifier) {
    this.unsubscribeQueue.push(identifier);
  }
  unsubscribePending() {
    if (!this.unsubscribeQueue.length) {
      return;
    }
    this.unsubscribeQueue.forEach(identifier => {
      for (var i = 0; i < this.subscribers.length; i++) {
        if (this.subscribers[i].id === identifier) {
          this.subscribers.splice(i, 1);
          break;
        }
      }
    });
    this.unsubscribeQueue = [];
  }
  publish(dataObject) {
    this.unsubscribePending();
    if (this.subscribers.length) {
      this.subscribers.forEach(function(subscriber) {
        return subscriber.callback(dataObject);
      });
    }
  }
  init() {
    this.publish({
      previous: this.previousNavObject,
      current: this.currentNavObject
    });
  }
  navigate() {
    this.previousRoute = this.currentRoute;
    this.previousNavObject = this.currentNavObject;
    this.currentRoute = document.location.pathname;
    this.currentNavObject = this.createNavObject();
    this.publish({
      previous: this.previousNavObject,
      current: this.currentNavObject
    });
  }
  createNavObject() {
    let navObj = {};
    navObj.page = this.currentRoute.substring(1);
    if (!navObj.page) {
      navObj.page = 'home';
    } else if (navObj.page.includes('tour/')) {
      navObj.query = navObj.page.substring(5);
      navObj.page = 'tour';
    } else if (
      navObj.page !== 'home'
      && navObj.page !== 'about'
      && navObj.page !== 'contact'
    ) {
      navObj.page = 'home';
    }
    return navObj;
  }
}
var GTC_ROUTER = new GTCRouter();
