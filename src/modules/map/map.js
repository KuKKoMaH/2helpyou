import scriptLoader from '../../js/scriptLoader';

const $map = $("#map");
let inited = false;
const initMap = (el) => {
  let { center, zoom } = el.dataset;
  center = JSON.parse(center);
  zoom = +zoom;

  const myMap = new ymaps.Map(el, {
    center:   center,
    controls: ['fullscreenControl', 'zoomControl'],
    zoom:     zoom,
  });

  const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
    $('.map__balloon')[0].outerHTML,
    {
      build:                 function () {
        this.constructor.superclass.build.call(this);

        this._$element = $('.map__balloon', this.getParentElement());

        this.applyElementOffset();

        this._$element.find('.close')
          .on('click', $.proxy(this.onCloseClick, this));
      },
      clear:                 function () {
        this._$element.find('.close')
          .off('click');

        this.constructor.superclass.clear.call(this);
      },
      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if (!this._isElement(this._$element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire('shapechange');
      },

      applyElementOffset: function () {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top:  15
        });
      },
      onCloseClick:       function (e) {
        e.preventDefault();

        this.events.fire('userclose');
      },
      getShape:           function () {
        if (!this._isElement(this._$element)) {
          return MyBalloonLayout.superclass.getShape.call(this);
        }

        var position = this._$element.position();

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
          [position.left, position.top], [
            position.left + this._$element[0].offsetWidth,
            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight,
          ],
        ]));
      },
      _isElement:         function (element) {
        return element && element[0] && element.find('.arrow')[0];
      },
    },
  );
  const marker = new ymaps.Placemark(
    center,
    {},
    { iconLayout: MyBalloonLayout },
  );
  myMap.geoObjects.add(marker);
};

if ($map.length) {
  var observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      if (inited) return;
      inited = true;
      scriptLoader(`https://api-maps.yandex.ru/2.1/?lang=ru_RU`, () => {
        ymaps.ready(init);

        function init() {
          const el = $map[0];
          try {
            initMap(el);
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  }, { threshold: 0 });
  observer.observe($map[0]);
}

