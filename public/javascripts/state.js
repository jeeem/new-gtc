class GTCState {
  constructor() {
    this.loadedCards = {};
    this.queuedCard = null;
  }
  addCard(tourId) {
    this.loadedCards[tourId] = true;
  }
  hasLoadedCard(tourId) {
    return this.loadedCards[tourId];
  }
  addQueuedCard(cardNode) {
    this.queuedCard = cardNode;
  }
  selectQueuedCard() {
    if (!this.queuedCard) {
      return;
    }
    this.queuedCard.click();
    this.queuedCard = null;
  }
}
var GTC_STATE = new GTCState();
