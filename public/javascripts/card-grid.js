/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 *///
{
    class Details {
        constructor() {
            this.DOM = {};

            const detailsTmpl = `
              <div class="details__bg details__bg--up"></div>
              <div class="details__bg details__bg--down"></div>
              <img class="details__img" src="/images/01.jpg" alt="img 01"/>
              <h3 class="details__subtitle">{{subTitle}}</h3>
              <h2 class="details__title">{{tour}}</h2>
              <div class="details__deco"></div>
              <div
                class="details__assets-container">
                <div
                  class="details__assets-col details__assets-audio">
                  <div
                    class="details__asset-icon details__audio-icon">
                    <img src="/images/asset-audio.png" />
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="#lightbox-audio-1"
                      data-type="html"
                      class="lightbox">
                      <i class="material-icons">mic</i><b>Generic</b>
                    </a>
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="#lightbox-audio-2"
                      data-type="html"
                      class="lightbox">
                      <i class="material-icons">mic</i><b>Amex</b>
                    </a>
                  </div>
                </div>
                <div class="details__assets-col details__assets-video">
                  <div
                    class="details__asset-icon details__audio-icon">
                    <img src="/images/asset-video.png" />
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="#lightbox-video-1"
                      data-type="html"
                      class="lightbox">
                      <i class="material-icons">play_circle_outline</i><b>Generic</b>
                    </a>
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="#lightbox-video-2"
                      data-type="html"
                      class="lightbox">
                      <i class="material-icons">play_circle_outline</i><b>Amex</b>
                    </a>
                  </div>
                </div>
                <div class="details__assets-col details__assets-photo">
                  <div
                    class="details__asset-icon details__audio-icon">
                    <img src="/images/asset-image.png" />
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="/images/01.jpg"
                      class="lightbox">
                      <i class="material-icons">create</i><b>Generic</b>
                    </a>
                  </div>
                  <div
                    class="details__asset details__audio-asset">
                    <a
                      href="/images/02.jpg"
                      class="lightbox">
                      <i class="material-icons">create</i><b>Amex</b>
                    </a>
                  </div>
                </div>
              </div>
              <button class="details__close"><svg class="icon icon--cross"><use xlink:href="#icon-cross"></use></svg></button>
            `;
            if (!document.getElementsByClassName('details').length) {
              this.DOM.details = document.createElement('div');
              this.DOM.details.className = 'details';
              this.DOM.details.innerHTML = detailsTmpl;
              document.getElementsByClassName('body-container')[0].appendChild(this.DOM.details);
            } else {
              this.DOM.details = document.getElementsByClassName('details')[0];
            }
            this.init();
        }
        init() {
            this.DOM.bgUp = this.DOM.details.querySelector('.details__bg--up');
            this.DOM.bgDown = this.DOM.details.querySelector('.details__bg--down');
            this.DOM.img = this.DOM.details.querySelector('.details__img');
            this.DOM.title = this.DOM.details.querySelector('.details__title');
            this.DOM.deco = this.DOM.details.querySelector('.details__deco');
            this.DOM.subtitle = this.DOM.details.querySelector('.details__subtitle');
            this.DOM.close = this.DOM.details.querySelector('.details__close')

            this.initEvents();
        }
        initEvents() {
            this.DOM.close.addEventListener('click', () => this.close());
        }
        fill(info) {
            this.DOM.img.src = info.img;
            this.DOM.title.innerHTML = info.title;
            this.DOM.deco.style.backgroundImage = `url(${info.img})`;
            this.DOM.subtitle.innerHTML = info.subtitle;
        }
        getProductDetailsRect() {
            return {
                productBgRect: this.DOM.productBg.getBoundingClientRect(),
                detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
                productImgRect: this.DOM.productImg.getBoundingClientRect(),
                detailsImgRect: this.DOM.img.getBoundingClientRect()
            };
        }
        open(data) {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;
            let gridParent = document.querySelector('.cards-container');
            gridParent.classList.add('cards-container--open');

            this.DOM.details.classList.add('details--open');

            this.DOM.productBg = data.productBg;
            this.DOM.productImg = data.productImg;

            this.DOM.productBg.style.opacity = 0;
            this.DOM.productImg.style.opacity = 0;

            const rect = this.getProductDetailsRect();

            this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height/rect.detailsBgRect.height})`;
            this.DOM.bgDown.style.opacity = 1;

            this.DOM.img.style.transform = `translateX(${rect.productImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height/rect.detailsImgRect.height})`;
            this.DOM.img.style.opacity = 1;

            anime({
                targets: this.DOM.bgDown,
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });
						anime({
                targets: this.DOM.img,
                duration: 800,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.subtitle, this.DOM.title],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: (target, index) => {
                    return index*60;
                },
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [50,0] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [0,1] : 1;
                },
                opacity: 1
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 1
            });

            anime({
                delay: 500,
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: ['100%',0],
                opacity: 1
            });

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: [0,'-100%']
            });
        }
        close() {
            if ( this.isAnimating ) return false;
            if (this.DOM.details.classList.contains('details--open-init')) {
              this.DOM.details.classList.remove('details--open-init');
              return this.DOM.details.classList.remove('details--open');
            }
            this.isAnimating = true;


            let gridParent = document.querySelector('.cards-container');
            gridParent.classList.remove('cards-container--open');
            this.DOM.details.classList.remove('details--open');

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: 0
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: '100%',
                opacity: 0
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 0
            });

            anime({
                targets: [this.DOM.subtitle, this.DOM.title],
                duration: 20,
                easing: 'linear',
                opacity: 0
            });

            const rect = this.getProductDetailsRect();
            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: 250,
                easing: 'easeOutSine',
                translateX: (target, index) => {
                    return index ? rect.productImgRect.left-rect.detailsImgRect.left : rect.productBgRect.left-rect.detailsBgRect.left;
                },
                translateY: (target, index) => {
                    return index ? rect.productImgRect.top-rect.detailsImgRect.top : rect.productBgRect.top-rect.detailsBgRect.top;
                },
                scaleX: (target, index) => {
                    return index ? rect.productImgRect.width/rect.detailsImgRect.width : rect.productBgRect.width/rect.detailsBgRect.width;
                },
                scaleY: (target, index) => {
                    return index ? rect.productImgRect.height/rect.detailsImgRect.height : rect.productBgRect.height/rect.detailsBgRect.height;
                },
                complete: () => {
                    this.DOM.bgDown.style.opacity = 0;
                    this.DOM.img.style.opacity = 0;
                    this.DOM.bgDown.style.transform = 'none';
                    this.DOM.img.style.transform = 'none';
                    this.DOM.productBg.style.opacity = 1;
                    this.DOM.productImg.style.opacity = 1;
                    this.isAnimating = false;
                }
            });
        }
    };

    class Item {
		constructor(el) {
			this.DOM = {};
            this.DOM.el = el;
            this.DOM.product = this.DOM.el;
            this.DOM.productBg = this.DOM.product.querySelector('.product__bg');
						this.DOM.top = this.DOM.product.querySelector('.card__top');
						this.DOM.bottom = this.DOM.product.querySelector('.card__bottom')
            this.DOM.productImg = this.DOM.top.children[0];
            this.info = {
                img: this.DOM.productImg.src,
                title: this.DOM.product.querySelector('.card-title').innerHTML,
                subtitle: this.DOM.product.querySelector('.card-subtext').innerHTML
            };

			this.initEvents();
		}
        initEvents() {
            this.DOM.product.addEventListener('click', () => { console.log(this); this.open();});
        }
        open() {
            DOM.details.fill(this.info);
            DOM.details.open({
                productBg: this.DOM.productBg,
                productImg: this.DOM.productImg
            });
        }
    };

    const DOM = {};
    DOM.grid = document.querySelector('.cards-container');
    DOM.content = DOM.grid.parentNode;
    DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.card'));
    let items = [];
    DOM.gridItems.forEach(item => items.push(new Item(item)));

    DOM.details = new Details();
    // imagesLoaded(document.body, () => document.body.classList.remove('loading'));
};
