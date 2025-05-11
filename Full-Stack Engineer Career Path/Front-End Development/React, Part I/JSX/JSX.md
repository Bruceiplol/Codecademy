- React is a modular, scalable, flexible, and popular front-end framework.
- JSX is a syntax extension for JavaScript which allows us to treat HTML as expressions.
- They can be stored in variables, objects, arrays, and more!
- JSX elements can have attributes and be nested within each other, just like in HTML.
- JSX must have exactly one outer element, and other elements can be nested inside.
- createRoot() from react-dom/client can be used to create a React root at the specified DOM element.
- A React root’s render() method can be used to render JSX on the screen.
- A React root’s render() method only updates DOM elements that have changed using the virtual DOM.

----------------------------------------------------------------------------------------------------------
```js
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
// Write code here:
const myList = (
  <ul>
    <li>111</li>
    <li>222</li>
    <li>333</li>
  </ul>
);

root.render(myList);
```
