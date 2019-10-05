const EXPIRY        = 365 * 24 * 60 * 60 * 1000;
const COOKIE_PREFIX = 'wp_';

const setCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + EXPIRY);
  const expires   = "; expires=" + date.toGMTString();
  value           = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
  document.cookie = name + "=" + value + expires + "; path=/";
};

const cookies = (() => {
  function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  var jar     = {};
  var cookies = document.cookie ? document.cookie.split('; ') : [];
  var i       = 0;

  for (; i < cookies.length; i++) {
    var parts  = cookies[i].split('=');
    var cookie = parts.slice(1).join('=');

    if (cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      var name = decode(parts[0]);
      cookie   = decode(cookie);

      jar[name] = cookie;

    } catch (e) {
    }
  }

  return jar;
})();

const queryParams = (() => {
  const params = {};
  const raw    = location.search.substr(1).split("&");
  for (let i = 0; i < raw.length; i++) {
    const tmp      = raw[i].split("=");
    params[tmp[0]] = decodeURIComponent(tmp[1]);
  }
  return params;
})();

const params = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid'
];

for (let i = 0; i < params.length; i++) {
  const name  = params[i];
  const value = queryParams[name];
  if (value) {
    setCookie(COOKIE_PREFIX + name, value);
  }
}

const referrer = document.referrer;
if (referrer) setCookie(COOKIE_PREFIX + 'referrer', referrer);

var utmCookie = {
  cookieUtmName:   "_utmz_cf7",
  cookieRefName:   "_referrer",
  cookieGclidName: "_gclid",

  utmNeedSave: function () {
    var trafficSrc = this.readCookie(this.cookieUtmName); //get OWN cookie
    if (trafficSrc != null) {
      return false;
    }

    var utmzCookie = this.readCookie("__utmz"); //get GA cookie
    if (utmzCookie != null) {
      this.writeUtmCookieFromUtmz(utmzCookie);
      return false;
    }

    var utm_source = this.getParameterByName('utm_source');
    // Fix For Facebook
    var source     = this.getParameterByName('source');
    ;
    if (utm_source != "" && source != "" && utm_source != undefined && source != undefined) {
      return true;
    } else {
      this.createCookie(this.cookieUtmName, 'utm_source=(none)', this.cookieExpiryDays);
    }

    var gclid = this.getParameterByName('gclid');
    if (gclid != "" && gclid != undefined) {
      this.writeCookieOnce(this.cookieGclidName, gclid);
    }

  },

  writeUtmCookieFromParams: function () {
    var trafficSrc = '';
    for (utmKey in this.utmParams) {
      trafficSrc += this.utmParams[utmKey] + '=' + this.getParameterByName(utmKey) + '|';
    }
    /*for (var i = 0; i < this.utmParams.length; i++) {
      trafficSrc += this.utmParams[i] + '=' + this.getParameterByName( this.utmParams[i] ) + '|';
    }*/
    this.createCookie(this.cookieUtmName, trafficSrc.substring(0, trafficSrc.length - 1), this.cookieExpiryDays);
  },

  writeUtmCookieFromUtmz: function (utmzCookie) {
    var z = utmzCookie.split('.');
    if (z.length >= 4) {
      var y = z[4].split('|');
      for (i = 0; i < y.length; i++) {
        var pair        = y[i].split("=");
        values[pair[0]] = pair[1];
      }
    }
    this.createCookie('utmz', trafficSrc.substring(0, trafficSrc.length - 1), this.cookieExpiryDays);
  },

  writeCookieOnce: function (name, value) {
    var existingValue = this.readCookie(name);
    if (!existingValue) {
      this.createCookie(name, value, this.cookieExpiryDays);
    }
  },

  writeReferrerOnce: function () {
    value = document.referrer;
    if (value === "" || value === undefined) {
      this.writeCookieOnce(this.cookieRefName, "direct");
    } else {
      this.writeCookieOnce(this.cookieRefName, value);
    }
  },

  /*
     Remove the protocol for the referral token
  */
  removeProtocol: function (href) {
    return href.replace(/.*?:\/\//g, "");
  },

  run: function () {
    utmCookie.writeReferrerOnce();
    if (utmCookie.utmNeedSave()) {
      utmCookie.writeUtmCookieFromParams();
    }
  },

  log: function () {
    console.log(this.readCookie(this.cookieUtmName));
  }
};
// utmCookie.run();