'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');

///////////////////////////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////////////////
//Button Scroll To:

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  //IDEA Old Way:
  // let s1Cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1Cords.left + window.pageXOffset,
  //   top: s1Cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //IDEA New Way
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////
//page Navigation:
//Event Delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////
//Tabbed Component
tabsContainer.addEventListener('click', e => {
  const Clicked = e.target.closest('.operations__tab');
  //Guard Clause
  if (!Clicked) return;
  //removing ClassList
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabContents.forEach(el => el.classList.remove('operations__content--active'));
  //adding Active to tabs
  Clicked.classList.add('operations__tab--active');
  //adding Active to Content
  document
    .querySelector(`.operations__content--${Clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
/////////////////////////////////////////
//Menu Fade animation:
const HoverHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hovered = e.target;
    const logo = hovered.closest('.nav').querySelector('img');
    const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== hovered) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Adding arguments to handler
nav.addEventListener('mouseover', HoverHandler.bind(0.5));
nav.addEventListener('mouseout', HoverHandler.bind(1));
/////////////////////////////////////////
//Sticky Navigation:
//IDEA OLD Implementation (BAD)
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
//IDEA New Implementation (GOOD)!
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
/////////////////////////////////////////
//Revealing Sections:

const allSections = document.querySelectorAll('.section');
const RevealFunction = function (entries, observer) {
  const [entry] = entries;
  //Guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const RevealingObserver = new IntersectionObserver(RevealFunction, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  RevealingObserver.observe(section);
  // section.classList.add('section--hidden');
});

/////////////////////////////////////////
//Lazy Loading Image:
const targetImg = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const ImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
targetImg.forEach(img => ImgObserver.observe(img));

/////////////////////////////////////////
//Slider:
const slider = function () {
  //variables:
  const slidingImgs = document.querySelectorAll('.slide');
  const leftSLider = document.querySelector('.slider__btn--left');
  const rightSlider = document.querySelector('.slider__btn--right');
  let currSlider = 0;
  let maxSlider = slidingImgs.length;
  const dotsContainer = document.querySelector('.dots');

  //Functions
  const init = function () {
    goToSlider(0);
    createDots();
    activateDots(0);
  };
  const createDots = function () {
    slidingImgs.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDots = function (slides) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    const activeDot = document
      .querySelector(`.dots__dot[data-slide="${slides}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlider = function (slide) {
    slidingImgs.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const nextSlide = function () {
    if (currSlider === maxSlider - 1) currSlider = 0;
    else currSlider++;
    goToSlider(currSlider);
    activateDots(currSlider);
  };
  const prevSlide = function () {
    if (currSlider === 0) currSlider = maxSlider - 1;
    else currSlider--;
    goToSlider(currSlider);
    activateDots(currSlider);
  };
  init();
  rightSlider.addEventListener('click', nextSlide);
  leftSLider.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //this line = to
      //IDEA this line : const slide = e.target.dataset.slide;
      goToSlider(slide);
      console.log(slide);
      activateDots(slide);
    }
  });
};
slider();
