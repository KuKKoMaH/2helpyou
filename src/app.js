import 'jquery';
import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'jquery.maskedinput/src/jquery.maskedinput';
import SmoothScroll from 'smooth-scroll';

import './js/init';
import './modules/menu/menu';
import './modules/testimonials/testimonials';
import './modules/problems/problems';
import './modules/certificates/certificates';
import './modules/about/about';
import './modules/map/map';
import './modules/popup/popup';

$('input[type="tel"]').mask("+7 (999) 999-99-99");

window.smoothscroll = new SmoothScroll('a[href*="#"]', { header: '.header__container' });
