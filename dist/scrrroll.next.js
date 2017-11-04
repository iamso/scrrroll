/*!
 * scrrroll - version 0.2.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
/**
 * Default options
 * @type {Object}
 */
const defaults = {
  duration: 300,
  easing: t => t,
  offset: 0
};

/**
 * ID of last requested animation frame
 * @type {Number}
 */
let frame;

/**
 * Class with static scroll functions
 */
export default class Scrrroll {

  /**
   * Get document height
   * @type {Number}
   */
  static get docHeight() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  }

  /**
   * Get window height
   * @type {Number}
   */
  static get winHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  /**
   * Set default duration
   * @type {Number}
   */
  static set duration(duration) {
    if (!isNaN(duration)) {
      defaults.duration = +duration;
    }
  }

  /**
   * Set default easing function
   * @type {Function}
   */
  static set easing(easing) {
    if (/^f/.test(typeof easing)) {
      defaults.easing = easing;
    }
  }

  /**
  * Set default offset
  * @type {Number}
  */
  static set offset(offset) {
    if (!isNaN(offset)) {
      defaults.offset = +offset;
    }
  }

  /**
   * Scroll to a position/element
   * @param  {Number|HTMLElement} destination - position/element to scroll to
   * @param  {Number}             [duration]  - duration of scroll. defaults to defaults.duration
   * @param  {Function}           [easing]    - easing of scroll. defaults to defaults.easing
   * @return {Promise}                        - promise will be resolved when finished scrolling
   */
  static to(destination, duration = defaults.duration, easing = defaults.easing) {
    return new Promise(resolve => {
      const start = window.pageYOffset;
      const startTime = 'now' in window.performance ? performance.now() : Date.now();

      const documentHeight = this.docHeight;
      const windowHeight = this.winHeight;
      const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - defaults.offset;
      const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

      if (!/^f/.test(typeof easing)) {
        easing = defaults.easing;
      }

      function scroll() {
        const now = 'now' in window.performance ? performance.now() : Date.now();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunction = easing(time);
        window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

        if (window.pageYOffset === destinationOffsetToScroll) {
          resolve();
          return;
        }
        frame = requestAnimationFrame(scroll);
      }

      cancelAnimationFrame(frame);
      scroll();
    });
  }

  /**
   * Scroll to the top
   * @param  [...args] - array collecting parameters
   * @return {Promise} - promise will be resolved when finished scrolling
   */
  static toTop(...args) {
    return this.to(0, ...args);
  }

  /**
   * Scroll to the bottom
   * @param  [...args] - array collecting parameters
   * @return {Promise} - promise will be resolved when finished scrolling
   */
  static toBottom(...args) {
    const destination = this.docHeight - this.winHeight;
    return this.to(destination, ...args);
  }

  /**
   * Scroll an element into view
   * Alias for Scrrroll.to()
   * @param  [...args] - array collecting parameters
   * @return {Promise} - promise will be resolved when finished scrolling
   */
  static intoView(...args) {
    return this.to(...args);
  }

  /**
   * Scroll to the top of an element
   * Alias for Scrrroll.to()
   * @param  [...args] - array collecting parameters
   * @return {Promise} - promise will be resolved when finished scrolling
   */
  static top(...args) {
    return this.to(...args);
  }

  /**
   * Scroll an element into the center of the viewport
   * @param {HTMLElement} element - element to scroll to
   * @param  [...args]            - array collecting parameters
   * @return {Promise}            - promise will be resolved when finished scrolling
   */
  static center(element, ...args) {
    const documentHeight = this.docHeight;
    const windowHeight = this.winHeight;
    const elementHeight = element.offsetHeight;
    let destination = 0;

    if (elementHeight >= windowHeight - defaults.offset) {
      destination = element;
    } else {
      destination = element.offsetTop - windowHeight / 2 + elementHeight / 2 - defaults.offset / 2;
    }
    return this.to(destination, ...args);
  }

  /**
   * Scroll to the bottom of an element
   * @param {HTMLElement} element - element to scroll to
   * @param  [...args]            - array collecting parameters
   * @return {Promise}            - promise will be resolved when finished scrolling
   */
  static bottom(element, ...args) {
    let destination = element.offsetTop - this.winHeight + element.offsetHeight;
    return this.to(destination, ...args);
  }
}