class GTCState {
  constructor() {
    this.subscribers = [];
    this.unsubscribeQueue = [];

    this.PUBLISH_ACTIONS = {};
    this.PUBLISH_ACTIONS.ADD_HOME = 'add/home';
    this.PUBLISH_ACTIONS.ADD_SINGLE_TOUR = 'add/tour';
    this.PUBLISH_ACTIONS.ADD_VIDEOS = 'add/videos';

    this.CARDS = {};
    this.CARDS.FALLBACK = null;
    this.CARDS.HOME = null;
    this.CARDS.LOADED_IDS = {};
    this.CARDS.SINGLE_TOUR = {};
    this.CARDS.QUEUED_SELECT = null;

    this.VIDEOS = {};
    this.VIDEOS.HOME = null;
    this.VIDEOS.FALLBACK = null;
  }
  addHomeCards(homeCardsArray) {
    this.CARDS.HOME = homeCardsArray;
    this.publish({
      type: this.PUBLISH_ACTIONS.ADD_HOME,
      data: this.CARDS.HOME
    });
  }
  addSingleTour(singleTourId) {
    this.CARDS.SINGLE_TOUR = singleTourId;
    this.publish({
      type: this.PUBLISH_ACTIONS.ADD_SINGLE_TOUR,
      data: this.CARDS.SINGLE_TOUR
    });
  }
  addHomeVideos(homeVideosArray) {
    this.VIDEOS.HOME = homeVideosArray;
    this.publish({
      type: this.PUBLISH_ACTIONS.ADD_VIDEOS,
      data: this.VIDEOS.HOME
    });
  }
  addCard(tourId) {
    this.CARDS.LOADED_IDS[tourId] = true;
  }
  hasLoadedCard(tourId) {
    return this.CARDS.LOADED_IDS[tourId];
  }
  addQueuedCard(cardNode) {
    this.CARDS.QUEUED_SELECT = cardNode;
  }
  selectQueuedCard() {
    if (!this.CARDS.QUEUED_SELECT) {
      return;
    }
    this.CARDS.QUEUED_SELECT.click();
    this.CARDS.QUEUED_SELECT = null;
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
}
var GTC_STATE = new GTCState();

GTC_STATE.CARDS.FALLBACK = [
   {
      "tourID":"sJ90qe",
      "tourName":"MICHELLE OBAMA",
      "cardSrc":"http://52.87.249.145:3000/proxy/qvQQhC.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/26eTTE.jpg",
      "subTitle":false,
      "tvSpots":[
         {
            "spotTitle":"TV - Europe",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/baKzKJ.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Radio Register now",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/8onSez.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - Available Now",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/156331.jpg"
         }
      ]
   },
   {
      "tourID":"3zcoMV",
      "tourName":"SHAWN MENDES",
      "cardSrc":"http://52.87.249.145:3000/proxy/R6kmAM.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/3QTa2l.jpg",
      "subTitle":"2019",
      "tvSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/ZEvcxB.mp4"
         },
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/kc5pN9.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"60",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/3FpU6W.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/136007.jpg"
         }
      ]
   },
   {
      "tourID":"4QJquL",
      "tourName":"DIANA ROSS",
      "cardSrc":"http://52.87.249.145:3000/proxy/yeQuUS.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/MKi6c3.jpg",
      "subTitle":"2019",
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/iyHt5f.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art - Tour",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/165575.jpg"
         }
      ],
      "isWide":true
   },
   {
      "tourID":"GZEfu3",
      "tourName":"CIRQUE DU SOLEIL",
      "cardSrc":"http://52.87.249.145:3000/proxy/zyG13z.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/wW2S5D.jpg",
      "subTitle":"CRYSTAL",
      "tvSpots":[
         {
            "spotTitle":"REVISED CAT1",
            "spotDuration":"15",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/pkw3tN.mp4"
         },
         {
            "spotTitle":"CAT1 DIGITAL BOARD",
            "spotDuration":"10",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/dKRcjn.mp4"
         },
         {
            "spotTitle":"REVISED CAT1",
            "spotDuration":"15",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/4Vl768.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"REVISED CAT1",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/psJVLK.mp3"
         }
      ],
      "isWide":true
   },
   {
      "tourID":"es94DQ",
      "tourName":"EAGLES",
      "cardSrc":"http://52.87.249.145:3000/proxy/UYyL98.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/6sh91X.jpg",
      "subTitle":"2018",
      "tvSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/8KiOLa.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/XNDuan.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - New Arena 2018",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/130746.jpg"
         }
      ]
   },
   {
      "tourID":"D9pqBF",
      "tourName":"JOHN MAYER",
      "cardSrc":"http://52.87.249.145:3000/proxy/TF9EZb.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/eQNHLd.jpg",
      "subTitle":"2019",
      "tvSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/5VBsFp.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/J0kX52.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - North America",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/159728.jpg"
         }
      ]
   },
   {
      "tourID":"qzJuH7",
      "tourName":"CARRIE UNDERWOOD",
      "cardSrc":"http://52.87.249.145:3000/proxy/JNkIN6.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/vhT6FV.jpg",
      "subTitle":"CRY PRETTY TOUR",
      "tvSpots":[
         {
            "spotTitle":"TV",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/31plv9.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Radio",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/oOOAAL.mp3"
         },
         {
            "spotTitle":"Radio",
            "spotDuration":"60",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/inm8mK.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package 360 with Maddie & Tae and Runaway June",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/159388.jpg"
         }
      ]
   },
   {
      "tourID":"9OIg6a",
      "tourName":"ARIANA GRANDE",
      "cardSrc":"http://52.87.249.145:3000/proxy/lKoPJB.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/YplFxc.jpg",
      "subTitle":"2019",
      "tvSpots":[
         {
            "spotTitle":"TV - International",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/DfYdCz.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"International",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/tRV04A.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - International",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/157531.jpg"
         }
      ]
   },
   {
      "tourID":"mpuQua",
      "tourName":"THE CHAINSMOKERS",
      "cardSrc":"http://52.87.249.145:3000/proxy/5Ys2S0.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/Gk65E2.jpg",
      "subTitle":"2019",
      "tvSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/8CjYyo.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/4RCOu9.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/161771.jpg"
         }
      ],
      "isWide":true
   },
   {
      "tourID":"WG0WOT",
      "tourName":"CHER",
      "cardSrc":"http://52.87.249.145:3000/proxy/NeXDBa.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/B9U3q1.jpg",
      "subTitle":"HERE WE GO AGAIN TOUR 2019",
      "tvSpots":[
         {
            "spotTitle":"TV with Nile Rodgers & Chic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/K4aDd0.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/90jcIv.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package with Nile Rodgers & Chic",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/147220.jpg"
         }
      ],
      "isWide":true
   },
   {
      "tourID":"ukr4Lm",
      "tourName":"BACKSTREET BOYS",
      "cardSrc":"http://52.87.249.145:3000/proxy/Ebhcon.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/Pmvfap.jpg",
      "subTitle":"DNA WORLD TOUR 2019",
      "tvSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/QylcgN.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/rzswKn.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/151371.jpg"
         }
      ]
   },
   {
      "tourID":"oyItJp",
      "tourName":"BILLIE EILISH",
      "cardSrc":"http://52.87.249.145:3000/proxy/7hGUrF.jpg",
      "wideCardSrc":"http://52.87.249.145:3000/proxy/k0zIje.jpg",
      "subTitle":"2019",
      "radioSpots":[
         {
            "spotTitle":"Radio Kelly VO",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/8bH6sk.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - World Tour",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/161004.jpg"
         }
      ]
   }
];

GTC_STATE.VIDEOS.FALLBACK = [
   {
      "tourName":"Carrie Underwood - Cry Pretty Tour",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=vhT6FV.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/31plv9.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Shawn Mendes 2019",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=3QTa2l.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/ZEvcxB.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"The Chainsmokers 2019",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=Gk65E2.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/8CjYyo.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Cher - Here We Go Again Tour 2019",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=B9U3q1.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/K4aDd0.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Backstreet Boys - DNA World Tour 2019",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=Pmvfap.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/QylcgN.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Lady Gaga - Las Vegas Residency",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=OyMJl7.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/AWOwPv.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Eagles 2018",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=6sh91X.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/8KiOLa.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"John Mayer 2019",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=eQNHLd.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/5VBsFp.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Cirque du Soleil - CRYSTAL",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=wW2S5D.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/pkw3tN.mp4",
      "Description":"NULL"
   },
   {
      "tourName":"Michelle Obama",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=26eTTE.jpg",
      "videoSrc":"http://d2rsmyw7crhe5b.cloudfront.net/baKzKJ.mp4",
      "Description":"NULL"
   }
];
