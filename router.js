/**
 * Router - JavaScript library for client-side routing
 *
 * Copyright (c) 2016 happyCoda
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/happyCoda/router
 *
 * Version:  0.1.0
 *
 */

/**
* Creates a new Router
* @class Router
* @param {Object} settings - Parameters to set route matchers
*/
function Router(settings) {
  this.matchers = settings.matchers;
}

/**
* A public method to start router stuff
* @method run
*/
Router.prototype.run = function () {

  var currentUrl = window.location.href;

  this.routeHandler(currentUrl);

  function hashchangeHandler(evt) {
    this.routeHandler(evt.newURL);
  }

  window.addEventListener('hashchange', hashchangeHandler.bind(this));
};

/**
* A public method to handle given route
* @method routeHandler
* @param {String} url - An url for do matching and handle route
*/
Router.prototype.routeHandler = function (url) {
  var currentRoute = this.getRoute(url),
    routes = Object.keys(this.matchers),
    match,
    routeHandlerParams;

  if (currentRoute === '') {
    window.location.hash = '/';

    return false;
  }

  match = routes.filter(function (route) {
    var routeParts,
      paramsToPatterns,
      patternStr,
      re;

    routeParts = route.split('/');

    paramsToPatterns = routeParts.map(function (part) {
      if (part.indexOf(':') === 0) {
        part = '([A-Za-z0-9_-]+)';
      }

      return part;
    });

    patternStr = paramsToPatterns.join('/');

    patternStr = '^' + patternStr.replace(/\//gi, '\\/') + '$';

    re = new RegExp(patternStr, 'gi');

    currentRoute.replace(re, function (m) {

      var params = Array.prototype.slice.call(arguments, 1, -2);

      routeHandlerParams = params;

      return m;
    });

    return re.test(currentRoute);
  });

  if (match.length > 0) {

    this.matchers[match[0]].apply(this, routeHandlerParams);
  } else {

    throw new Error('there is no routes matching: ' + currentRoute);
  }

};

/**
* A public method to get route/hash
* @method getRoute
* @param {String} url - An url to squize hash from
*/
Router.prototype.getRoute = function (url) {
  return url.split('#')[1] || '';
};

/**
* A public method to navigate to given url
* @method navigate
* @param {String} url - An url to get route from
* @param {Function} cb - A callback function
*/
Router.prototype.navigate = function (url, cb) {
  var hash = this.getRoute(url);

  if (hash === '') {
    hash = url;
  }

  window.location.hash = hash;

  if (cb) {
    cb();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
