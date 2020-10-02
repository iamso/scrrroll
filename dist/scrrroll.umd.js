/*!
 * scrrroll - version 0.7.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2020 Steve Ottoz
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Scrrroll=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var n,o={duration:300,easing:function(t){return t},offset:0};return function(){function i(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i)}var r,a,f;return r=i,f=[{key:"to",value:function(e){var i=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.duration,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.easing;return new Promise((function(f){var c=window.pageYOffset,u="now"in window.performance?performance.now():Date.now(),l=i.docHeight,s=i.winHeight,h="number"==typeof e?e:Math.ceil(e.getBoundingClientRect().top+window.pageYOffset)-o.offset,d=Math.round(l-h<s?l-s:h),g=c<d;/^f/.test(t(a))||(a=o.easing),cancelAnimationFrame(n),function t(){var e="now"in window.performance?performance.now():Date.now(),o=Math.min(1,(e-u)/r),l=a(o);window.scroll(0,Math.ceil(l*(d-c)+c)),Math.abs(window.pageYOffset-d)<1||g&&window.pageYOffset>=i.docHeight-i.winHeight?f():n=requestAnimationFrame(t)}()}))}},{key:"toTop",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return this.to.apply(this,[0].concat(e))}},{key:"toBottom",value:function(){for(var t=this.docHeight-this.winHeight,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return this.to.apply(this,[t].concat(n))}},{key:"intoView",value:function(){return this.to.apply(this,arguments)}},{key:"top",value:function(){return this.to.apply(this,arguments)}},{key:"center",value:function(t){this.docHeight;var e=this.winHeight,n=t.getBoundingClientRect(),i=n.height,r=0;r=i>=e-o.offset?t:Math.max(Math.ceil(n.top+window.pageYOffset)-e/2+i/2-o.offset/2,0);for(var a=arguments.length,f=new Array(a>1?a-1:0),c=1;c<a;c++)f[c-1]=arguments[c];return this.to.apply(this,[r].concat(f))}},{key:"bottom",value:function(t){for(var e=t.getBoundingClientRect(),n=Math.ceil(e.top+window.pageYOffset)-this.winHeight+e.height,o=arguments.length,i=new Array(o>1?o-1:0),r=1;r<o;r++)i[r-1]=arguments[r];return this.to.apply(this,[n].concat(i))}},{key:"docHeight",get:function(){return Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)}},{key:"winHeight",get:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}},{key:"duration",set:function(t){isNaN(t)||(o.duration=+t)}},{key:"easing",set:function(e){/^f/.test(t(e))&&(o.easing=e)}},{key:"offset",set:function(t){isNaN(t)||(o.offset=+t)}}],(a=null)&&e(r.prototype,a),f&&e(r,f),i}()}));