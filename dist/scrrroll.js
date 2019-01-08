/*!
 * scrrroll - version 0.4.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2019 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Scrrroll = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * Default options
   * @type {Object}
   */
  var defaults = {
    duration: 300,
    easing: function easing(t) {
      return t;
    },
    offset: 0
  };

  /**
   * ID of last requested animation frame
   * @type {Number}
   */
  var frame = void 0;

  /**
   * Class with static scroll functions
   */

  var Scrrroll = function () {
    function Scrrroll() {
      _classCallCheck(this, Scrrroll);
    }

    _createClass(Scrrroll, null, [{
      key: 'to',
      value: function to(destination) {
        var _this = this;

        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.duration;
        var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.easing;

        return new Promise(function (resolve) {
          var start = window.pageYOffset;
          var startTime = 'now' in window.performance ? performance.now() : Date.now();

          var documentHeight = _this.docHeight;
          var windowHeight = _this.winHeight;
          var destinationOffset = typeof destination === 'number' ? destination : Math.ceil(destination.getBoundingClientRect().top + window.pageYOffset) - defaults.offset;
          var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

          if (!/^f/.test(typeof easing === 'undefined' ? 'undefined' : _typeof(easing))) {
            easing = defaults.easing;
          }

          function scroll() {
            var now = 'now' in window.performance ? performance.now() : Date.now();
            var time = Math.min(1, (now - startTime) / duration);
            var timeFunction = easing(time);
            window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

            if (Math.abs(window.pageYOffset - destinationOffsetToScroll) < 1) {
              resolve();
              return;
            }
            frame = requestAnimationFrame(scroll);
          }

          cancelAnimationFrame(frame);
          scroll();
        });
      }
    }, {
      key: 'toTop',
      value: function toTop() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.to.apply(this, [0].concat(args));
      }
    }, {
      key: 'toBottom',
      value: function toBottom() {
        var destination = this.docHeight - this.winHeight;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.to.apply(this, [destination].concat(args));
      }
    }, {
      key: 'intoView',
      value: function intoView() {
        return this.to.apply(this, arguments);
      }
    }, {
      key: 'top',
      value: function top() {
        return this.to.apply(this, arguments);
      }
    }, {
      key: 'center',
      value: function center(element) {
        var documentHeight = this.docHeight;
        var windowHeight = this.winHeight;
        var elementRect = element.getBoundingClientRect();
        var elementHeight = elementRect.height;
        var destination = 0;

        if (elementHeight >= windowHeight - defaults.offset) {
          destination = element;
        } else {
          destination = Math.ceil(elementRect.top + window.pageYOffset) - windowHeight / 2 + elementHeight / 2 - defaults.offset / 2;
        }

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return this.to.apply(this, [destination].concat(args));
      }
    }, {
      key: 'bottom',
      value: function bottom(element) {
        var elementRect = element.getBoundingClientRect();
        var destination = Math.ceil(elementRect.top + window.pageYOffset) - this.winHeight + elementRect.height;

        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return this.to.apply(this, [destination].concat(args));
      }
    }, {
      key: 'docHeight',
      get: function get() {
        return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      }
    }, {
      key: 'winHeight',
      get: function get() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }
    }, {
      key: 'duration',
      set: function set(duration) {
        if (!isNaN(duration)) {
          defaults.duration = +duration;
        }
      }
    }, {
      key: 'easing',
      set: function set(easing) {
        if (/^f/.test(typeof easing === 'undefined' ? 'undefined' : _typeof(easing))) {
          defaults.easing = easing;
        }
      }
    }, {
      key: 'offset',
      set: function set(offset) {
        if (!isNaN(offset)) {
          defaults.offset = +offset;
        }
      }
    }]);

    return Scrrroll;
  }();

  exports.default = Scrrroll;
  module.exports = exports['default'];
});