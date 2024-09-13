/**
 * Default options
 * @type {Object}
 */
const defaults = {
  duration: 300,
  easing: t => t,
  offset: 0,
  container: window
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
   * Get current duration
   */
  static get duration() {
    return defaults.duration;
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
   * Get current easing function
   */
  static get easing() {
    return defaults.easing;
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
  * Get current offset
  */
  static get offset() {
    return defaults.offset;
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
   * Get current container
   */
   static get container() {
    return defaults.container;
  }

  /**
   * Set default container
   * @type {Number}
   */
  static set container(container) {
    if (container instanceof Window || container instanceof HTMLElement) {
      defaults.container = container;
    }
  }

  /**
   * Scroll to a position/element
   * @param  {Number|HTMLElement} destination - position/element to scroll to
   * @param  {Number}             [duration]  - duration of scroll. defaults to defaults.duration
   * @param  {Function}           [easing]    - easing of scroll. defaults to defaults.easing
   * @param  {HTMLElement|Window} [container] - the scroll container. defaults to defaults.container
   * @return {Promise}                        - promise will be resolved when finished scrolling
   */
  static to(destination, duration = defaults.duration, easing = defaults.easing, container = defaults.container) {
    return new Promise(resolve => {
      const isWindow = container === window;
      const start = isWindow ? window.scrollY : container.scrollTop;
      const startTime = 'now' in window.performance ? performance.now() : Date.now();
      const contentHeight = isWindow ? this.docHeight : container.scrollHeight;
      const containerHeight = isWindow ? this.winHeight : container.clientHeight;
      const destinationOffset = Math.max(0, (typeof destination === 'number' ? destination : Math.ceil(destination.getBoundingClientRect().top + start) - defaults.offset));
      const destinationOffsetToScroll = Math.round(contentHeight - destinationOffset < containerHeight ? contentHeight - containerHeight : destinationOffset);
      const down = start < destinationOffsetToScroll;

      if (!/^f/.test(typeof easing)) {
        easing = defaults.easing;
      }

      const scroll = () => {
        const now = 'now' in window.performance ? performance.now() : Date.now();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easing(time);
        const scrollTop = isWindow ? window.scrollY : container.scrollTop;
        const scrollTo = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start)


        if (isWindow) {
          window.scroll(0, scrollTo);
        }
        else {
          container.scrollTop = scrollTo;
        }

        if (Math.abs(scrollTop - destinationOffsetToScroll) < 1 || (down && scrollTop >= (contentHeight - containerHeight))) {
          resolve();
          return;
        }
        frame = requestAnimationFrame(scroll);
      };

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
   * @param  {Number}             [duration]  - duration of scroll. defaults to defaults.duration
   * @param  {Function}           [easing]    - easing of scroll. defaults to defaults.easing
   * @param  {HTMLElement|Window} [container] - the scroll container. defaults to defaults.container
   * @return {Promise}                        - promise will be resolved when finished scrolling
   */
  static toBottom(duration = defaults.duration, easing = defaults.easing, container = defaults.container) {
    const isWindow = container === window;
    const contentHeight = isWindow ? this.docHeight : container.scrollHeight;
    const destination = contentHeight - containerHeight;
    return this.to(destination, duration, easing, container);
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
   * @param {HTMLElement}         element     - element to scroll to
   * @param  {Number}             [duration]  - duration of scroll. defaults to defaults.duration
   * @param  {Function}           [easing]    - easing of scroll. defaults to defaults.easing
   * @param  {HTMLElement|Window} [container] - the scroll container. defaults to defaults.container
   * @return {Promise}                        - promise will be resolved when finished scrolling
   */
  static center(element, duration = defaults.duration, easing = defaults.easing, container = defaults.container) {
    const isWindow = container === window;
    const containerHeight = isWindow ? this.winHeight : container.clientHeight;
    const elementRect = element.getBoundingClientRect();
    const elementHeight = elementRect.height;
    const scrollTop = isWindow ? window.scrollY : container.scrollTop;
    let destination = 0;

    if (elementHeight >= containerHeight - defaults.offset) {
      destination = element;
    }
    else {
      destination = Math.max(Math.ceil(elementRect.top + scrollTop) - (containerHeight / 2) + (elementHeight / 2) - (defaults.offset / 2), 0);
    }
    return this.to(destination, duration, easing, container);
  }

  /**
   * Scroll to the bottom of an element
   * @param {HTMLElement}         element     - element to scroll to
   * @param  {Number}             [duration]  - duration of scroll. defaults to defaults.duration
   * @param  {Function}           [easing]    - easing of scroll. defaults to defaults.easing
   * @param  {HTMLElement|Window} [container] - the scroll container. defaults to defaults.container
   * @return {Promise}                        - promise will be resolved when finished scrolling
   */
  static bottom(element, duration = defaults.duration, easing = defaults.easing, container = defaults.container) {
    const isWindow = container === window;
    const containerHeight = isWindow ? this.winHeight : container.clientHeight;
    const scrollTop = isWindow ? window.scrollY : container.scrollTop;
    const elementRect = element.getBoundingClientRect();
    let destination = Math.ceil(elementRect.top + scrollTop) - containerHeight + elementRect.height;
    return this.to(destination, duration, easing, container);
  }
}
