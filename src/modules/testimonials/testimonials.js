import initSlider from '../../js/initSlider';

initSlider('.testimonials__slider', {
  slidesPerView: 1,
  spaceBetween:  20,
  loop:          true,
  autoHeight:    true,
  wrapperClass:  'testimonials__items',
  slideClass:    'testimonials__item',
  navigation:    {
    prevEl: '.testimonials__nav--prev',
    nextEl: '.testimonials__nav--next',
  },
});
