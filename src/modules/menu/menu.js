const $menu = $('.menu');
const $menuTrigger = $('.menu__button');
const activeClass = 'menu--active';
let menuVisible = false;

$menuTrigger.on('click', () => toggleMenu());

function toggleMenu() {
  if (menuVisible) {
    hideMenu();
  } else {
    showMenu();
  }
}

function showMenu() {
  if (menuVisible) return;
  $menu.addClass(activeClass);
  menuVisible = true;
}

function hideMenu() {
  if (!menuVisible) return;
  $menu.removeClass(activeClass);
  menuVisible = false;
}

$menu.find('a[href*="#"]').on('click', () => hideMenu());
