import initSlider from '../../js/initSlider';

initSlider('.about__slider', {
  slidesPerView: 1,
  loop:          true,
  // autoHeight:    true,
  wrapperClass:  'about__items',
  slideClass:    'about__item',
  navigation:    {
    prevEl: '.about__nav--prev',
    nextEl: '.about__nav--next',
  },
});
