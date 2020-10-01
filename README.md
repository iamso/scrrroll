Scrrroll
=======
Simple smooth scrolling.

Install
-------

```bash
npm install scrrroll
```

Example Setup
-------------

### Javascript

```javascript
import Scroll from 'scrrroll';

const destination = document.querySelector('.selector'); // Number or HTMLElement
const duration = 400; // Number
const easing = t => t; // Easing function

// Scroll to position/element
Scroll.to(destination, duration, easing).then(() => {});

// Scroll to the top
Scroll.toTop(duration, easing).then(() => {});

// Scroll to the bottom
Scroll.toBottom(duration, easing).then(() => {});

// Scroll an element into view
Scroll.intoView(destination, duration, easing).then(() => {});

// Scroll to the top of an element
Scroll.top(destination, duration, easing).then(() => {});

// Scroll an element into the center of the viewport
Scroll.center(destination, duration, easing).then(() => {});

// Scroll to the bottom of an element
Scroll.bottom(destination, duration, easing).then(() => {});
```

License
-------

[MIT License](LICENSE)
