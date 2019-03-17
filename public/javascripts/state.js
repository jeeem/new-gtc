class GTCState {
  constructor() {
    this.subscribers = [];
    this.unsubscribeQueue = [];

    this.PUBLISH_ACTIONS = {};
    this.PUBLISH_ACTIONS.ADD_HOME = 'add/home';
    this.PUBLISH_ACTIONS.ADD_SINGLE_TOUR = 'add/tour';

    this.CARDS = {};
    this.CARDS.FALLBACK = null;
    this.CARDS.HOME = null;
    this.CARDS.LOADED_IDS = {};
    this.CARDS.SINGLE_TOUR = {};
    this.CARDS.QUEUED_SELECT = null;
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
      "tourID":"GZEfu3",
      "tourName":"CIRQUE DU SOLEIL",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=3402610bb68a94452446be6e082d5c77&seed=6bb81b7a2fe8d83cc46d3b1e2cdd4eeb",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=50366b9c96e21646c3c052a8d41d0d34&seed=fd387f11a82327988e5205e8a7e1b5be",
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
      ]
   },
   {
      "tourID":"4QJquL",
      "tourName":"DIANA ROSS",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=6c481447c91f314aab324c2552a7ed33&seed=0ec92954352d667c036b06c667792413",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=c6ba8eddadb88ec2a9347668ba135dad&seed=066b47f1aec6389ad9f44937cdf360c9",
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
      ]
   },
   {
      "tourID":"sJ90qe",
      "tourName":"MICHELLE OBAMA",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=bd7f6b5d852bb17a9c5e4ba347ffe2ba&seed=73ecc613ce40eedf30226ad643b41bd6",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=10b8d39d20421bd4807fdde5c5df4560&seed=6bd7b49349a2908dac358f028414236d",
      "subTitle":false,
      "isWide": true,
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
      "tourID":"oyItJp",
      "tourName":"BILLIE EILISH",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=4b25243e0f45d7c11d2f506d70f9d57d&seed=93faedb82af9753b048ba253bca358a7",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=c7ddb868a15c6715444a18a0af821c71&seed=bb7fb913eb4251a12754d503e496a0b9",
      "subTitle":"2019",
      "isWide": true,
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
   },
   {
      "tourID":"ukr4Lm",
      "tourName":"BACKSTREET BOYS",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=2ffc5ec12587490833263e6ad9a57129&seed=0ff2d484077f28782027e6fe320a8469",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=b07715f306b2aa4af15b94ea44054faf&seed=a32b66391f5d85f4aa4e642301d027dc",
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
      "tourID":"3zcoMV",
      "tourName":"SHAWN MENDES",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=189bc9c577295291ea72d6a390585598&seed=1e8624ed10cb7458deb5bb6c2609d2d2",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=f6a07eac4312ea6b109798a556659ccb&seed=8e1103baf55afda9af7add17a036a55f",
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
      "tourID":"D9pqBF",
      "tourName":"JOHN MAYER",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=1b682ebb548f4a233444b22589ebecd6&seed=fc5855451a99b5b9ed192ec68321c867",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=ea0b25927c5c43ef9bf92427ad6c5d3c&seed=5cc47ef48d8bc2433cbb5e27d3d798e1",
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
      "tourID":"WG0WOT",
      "tourName":"CHER",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=4bab50ad7e995b13ff29897410c360e4&seed=ea545b8e5e019021f3dc79c8fd7bb5e0",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=8ad198ef9d4a0c3c90d88f0a705c94c4&seed=0b09b229b13790874c92fa24c134088a",
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
      ]
   },
   {
      "tourID":"9OIg6a",
      "tourName":"ARIANA GRANDE",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=70e2ce1e40aed71f51545641aa8f63bf&seed=3dba8f60ab9c8b26940cfc1cead535ea",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=fa90309745211ee689f2c426ef3c3e48&seed=36f2324a4e07e315e6868ef0da3f8cb7",
      "subTitle":"2019",
      "isWide": true,
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
      "tourID":"es94DQ",
      "tourName":"EAGLES",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=a0d5bceb2d469969ed42830f2a02ad0c&seed=765878b6ecbe9b718eb29852ed2a16ce",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=48fbae018d5c7c00571a91e32557e806&seed=1ba7bb4ba982ca98d9a77140181e3b2f",
      "subTitle":"2018",
      "isWide": true,
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
      "tourID":"Efb6Oi",
      "tourName":"LADY GAGA",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=f8baafc91c9c10445dd4a117a62aeb57&seed=4e4995dfd4a719c1d8d7d2f7a7af8dcf",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=6ca445328edef383e2b613da17cd56c5&seed=91999dc02dc50c987b6808edbbd25db9",
      "subTitle":"LAS VEGAS RESIDENCY",
      "tvSpots":[
         {
            "spotTitle":"TV - Evergreen",
            "spotDuration":"30",
            "spotURL":"http://d2rsmyw7crhe5b.cloudfront.net/AWOwPv.mp4"
         }
      ],
      "radioSpots":[
         {
            "spotTitle":"Generic",
            "spotDuration":"30",
            "spotURL":"http://d17hws2m7av7qo.cloudfront.net/media/revisions/new/SDsEGD.mp3"
         }
      ],
      "printItems":[
         {
            "itemTitle":"Key Art Package - Vertical",
            "thumbnailURL":"http://www.globaltourcreatives.com/media/revisions/thumbs/146988.jpg"
         }
      ]
   },
   {
      "tourID":"mpuQua",
      "tourName":"THE CHAINSMOKERS",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=ba1db0374395eaa169793b79066c6669&seed=d0f242edf5e898afcefdf91410e0e548",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=10d8130b0d569fa642d0bfe6fb4effaf&seed=9277c14a1afcca246e3f612b02a5cbda",
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
      ]
   },
   {
      "tourID":"qzJuH7",
      "tourName":"CARRIE UNDERWOOD",
      "cardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=1bd96611be46ca4038acd160caf3bcf4&seed=f55afc3c0cb3a62bddfd121c2439492c",
      "wideCardSrc":"http://www.globaltourcreatives.com/media/asset_lib/download.php?token=d047451a8a788a1f2524b8c827a7ca75&seed=567b972ae9fd8b28cfc51c3749b22e5b",
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
   }
];
