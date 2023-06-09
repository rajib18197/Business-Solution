'use strict';

/*=========================*/
////  * Modal Window *  ////
/*=========================*/

const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

/*=============================*/
////  * Button Scrolling *  ////
/*=============================*/
btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);
  console.log(window.pageXOffset, window.pageYOffset);
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  window.scrollTo({
    left: s1Coords.left + window.pageXOffset,
    top: s1Coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

/*=============================*/
////  * Tabbed Component *  ////
/*=============================*/
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
//////////// Not very Efficient way
// tabs.forEach(tab => {
//   tab.addEventListener('click', function () {
//     const data = tab.dataset.tab;
//     tabs.forEach(t => t.classList.remove('operations__tab--active'));
//     tab.classList.add('operations__tab--active');
//     tabsContent.forEach(content =>
//       content.classList.remove('operations__content--active')
//     );
//     document
//       .querySelector(`.operations__content--${data}`)
//       .classList.add('operations__content--active');
//   });
// });

///////////// Another way
tabsContainer.addEventListener('click', function (e) {
  const targetElement = e.target;
  console.log(targetElement);

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  const data = targetElement.dataset.tab;
  document
    .querySelector(`.operations__tab--${data}`)
    .classList.add('operations__tab--active');

  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${data}`)
    .classList.add('operations__content--active');
});

/*========================*/
////     * FAQ *       ////
/*========================*/

const questionContainer = document.querySelector('.questions');

const questions = document.querySelectorAll('.question');
questionContainer.addEventListener('click', function (e) {
  const questionEl = e.target.closest('.question');
  const answerElement = questionEl.querySelector('.question__description');
  console.log(answerElement);

  questions.forEach(question => {
    if (question !== questionEl) question.classList.remove('open');
  });
  // answerElement.classList.remove('hidden-box');
  questionEl.classList.toggle('open');
});

/*=============================*/
////  * Page Navigation *    ////
/*=============================*/
const header = document.querySelector('.header');

header.addEventListener('click', function (e) {
  e.preventDefault();
  const targetEl = e.target;
  if (!targetEl.classList.contains('header__link')) return;
  const href = targetEl.getAttribute('href');
  if (!href.slice(1).startsWith('section')) return;

  const section = document.querySelector(`${targetEl.getAttribute('href')}`);
  section.scrollIntoView({ behavior: 'smooth' });

  // const sectionCoords = section.getBoundingClientRect();
  // window.scrollTo({
  //   top: sectionCoords.top + window.pageYOffset,
  //   left: sectionCoords.left + window.pageXOffset,
  //   behavior: 'smooth',
  // });
});

/*======================================*/
////  * Navigation Fade Animation *   ////
/*======================================*/
const fade = function (e) {
  // console.log(e.target);
  if (!e.target.classList.contains('header__link')) return;
  const allLinks = e.target
    .closest('.header__nav')
    .querySelectorAll('.header__link');

  console.log(this);
  allLinks.forEach(link => {
    if (link !== e.target) link.style.opacity = this;
  });
};

header.addEventListener('mouseover', fade.bind(0.5));
header.addEventListener('mouseout', fade.bind(1));

/*=============================*/
////  * Sticky Navigation *  ////
/*=============================*/

const sectionHero = document.querySelector('.section-hero');
const headerNav = document.querySelector('.header__nav');

const obsCallback = function (entries) {
  // console.log(entries);
  entries.forEach(entry => {
    if (!entry.isIntersecting) headerNav.classList.add('sticky');
    else headerNav.classList.remove('sticky');
  });
};
const observer = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0.1,
});

observer.observe(sectionHero);

/*=============================*/
////  * Reveal Sections *    ////
/*=============================*/
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/*=============================*/
////  * Active Navigation *  ////
/*=============================*/
const allLinks = document.querySelectorAll('.header__link');

const activeLink = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // console.log(entry.target.id);
  allLinks.forEach(link => link.classList.remove('header__link--active'));

  // console.log(document.querySelector(`[href="#${entry.target.id}"]`));
  document
    .querySelector(`[href="#${entry.target.id}"]`)
    .classList.add('header__link--active');
};

const linkObserver = new IntersectionObserver(activeLink, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  // link.classList.remove('header__link--active');
  if (section.getAttribute('id')) {
    // console.log(section);
    linkObserver.observe(section);
  }
});

/*================================*/
////  * Lazy Loading Images *  ////
/*================================*/

const allImages = document.querySelectorAll('img[data-src]');
// console.log(allImages);

const lazyLoading = function ([entry], observer) {
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0.3,
});

allImages.forEach(img => {
  imageObserver.observe(img);
});

/*=============================*/
////  * Slider Component *   ////
/*=============================*/
const slider = function () {
  const slides = document.querySelectorAll('.raju .slide');
  const btnLeft = document.querySelector('.raju .slider__btn--left');
  const btnRight = document.querySelector('.raju .slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => {
      dot.classList.remove('dots__dot--active');
      // if (dot.dataset.slide == slide) {
      //   dot.classList.add('dots__dot--active');
      // }
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (currSlide) {
    currentSlide = currSlide;
    slides.forEach((slide, i) => {
      slide.style.transform = `translate(${100 * (i - currSlide)}%)`;
    });
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();

  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();

    e.key === 'ArrowRight' && nextSlide();
  });
  dotsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

slider();
