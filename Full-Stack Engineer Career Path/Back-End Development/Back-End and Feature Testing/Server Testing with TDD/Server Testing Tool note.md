## Server Testing TDD
- Server tests are used to test the server response only, not any front-end rendering of code or user interactions.
- Server tests are commonly used to test API responses, but we also use server tests for any server response that our application relies on. This can include checking status codes and error messages.
- These include Chai, jsdom, and SuperTest. We also review how to use async/await for asynchronous calls.

### Testing Framework: Chai
- to test if an array foo includes an element bar
```js
assert.ok(foo.includes(bar));
// To improve the readability and flow of our tests
const {assert} = require('chai');

assert.include('foobar', 'bar'); // Evaluates to true
```

### Testing HTML Responses
-  It is possible to use `.include()` to verify that the HTML response contains certain Strings, but gets cumbersome to verify the hierarchical relationships of DOM elements.
- We can use the jsdom library to improve this type of assertion.
- It allows us to select elements of the DOM and check relationships and content.
- we abstracted the jsdom functionality into a custom function, parseTextFromHTML:
```js
const jsdom = require("jsdom");

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};
```
- This function takes the HTML response as a string and the desired selector as inputs and returns the textContent of the corresponding element. If no element is found, it will return a TypeError.
```js
describe('HTML tests', () => {
  describe('#bar', () => {
    it('should include the string "Hello"', () => {
      // setup
      const foo = '<html><div id="bar">Hello</div><div id="buzz">Hello</div><html>';
      //asserts
      assert.include(parseTextFromHTML(foo, '#bar'), 'Hello'); 
    });
  });
});
```

### SuperTest for Async / Await
-  the SuperTest library was specifically designed for testing Node server responses and integrates well with Mocha and Chai.
-  To use SuperTest, we pass the app object from our app into the request function. To make a GET request, we use `.get()` with the desired route as the argument
-  It is also possible to perform a POST using SuperTest. We chain any desired properties or inputs to the HTTP call, and use `.send()` to make the request:

```js
const request = require('supertest');

await request(app)
          .get('/')
          .send();

await request(app)
          .post('/messages')
          .type('form')
          .send({author, message});
```
