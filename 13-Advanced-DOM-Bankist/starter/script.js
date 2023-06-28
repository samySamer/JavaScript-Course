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
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});