import LazyLoad from "vanilla-lazyload";

new LazyLoad({
  elements_selector: '.lazy, .lazyBg',
  callback_loaded:   (el) => {
    el.dataset.loaded = 'true';
    showImage(el);
  },
});

var callback = function (entries) {
  // inViewport = [];
  // console.log(entries);
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      // inViewport.push(entry.target);
      entry.target.dataset.viewed = 'true';
      showImage(entry.target);
    }
  }
};
var observer = new IntersectionObserver(callback, { threshold: .5 });
$('.lazy').each((i, el) => observer.observe(el));

function showImage(el) {
  const { loaded, viewed } = el.dataset;
  if (loaded && viewed) {
    el.classList.add('lazy--visible');
  }
}