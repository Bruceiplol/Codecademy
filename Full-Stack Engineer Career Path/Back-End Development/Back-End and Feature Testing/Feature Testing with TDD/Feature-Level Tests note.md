### Feature Test Toolbelt
- **Chai**: Node.js has a default assertion library that provides enough functionality to write basic test code. The Chai testing library extends the types of assertions we can make.
- **Headless Browsers**: Headless browsers allow us to write tests that mimic user interaction and then evaluate the results. They do not require us to render the application in a visible browser window.
- **WebdriverI/O**:WebdriverIO provides methods that allow us to programmatically interact with the user-facing elements of our app in a headless browser.

---
### Feature Test I
- Feature tests exercise behavior by simulating a user navigating the application in a web browser.
- Imagine we wanted to create a simple web-based poetry writing application.
- The first feature test we want to write is to check our application’s empty state. The functionality we want to test is:
  - When a user visits the homepage, the poems section is empty

```js
describe('poetry web app', () => {
  describe('user visits root', () => {
    it('page starts blank', () => {
      browser.url('/');
    });  
  });
});
```
- The term `‘root’`, refers to our application’s entry point, which in this example is the home page that users will visit in their browser.
- we add an `it` block to describe the behavior we want to test in our app. When a user visits the root of our app, they should have a blank page on which to write their own poem.
- the global `browser` (provided by WebdriverI/O) variable gives us access to the browser that Phantom is running in the background.
  - We can simulate a user interacting with our website by calling different methods on the global browser variable in our test suite.
  - For example, we can use `browser.url()` to simulate a user visiting the home page of our application
  - The `.url` method navigates to the URL that is passed to it as an argument.

#### Feature Test I: Assert
- The last thing our test needs is an assert statement to verify that the behavior we expect is equal to the actual behavior of our code.
- We can do this using the Chai `assert.equal` method, which evaluates if the two arguments are equal.
```js
describe('User visits root', () => {
  describe('without existing poems', () => {
    it('page starts blank', () => {
      browser.url('/');

      assert.equal(browser.getText('#poems'), '');
    });
  });
});
```
-  We can write a test for this behavior by deciding that poems will be listed in an HTML element with an id attribute set to poems.
-  The `.getText` method, from WebdriverI/O, gets the text content from the selected DOM element.

#### Feature Test I: Passing
- we will run the test and use the error message to drive the next step in our development process.
- The error message describes the issue in terms of HTML elements and tells us that the element we are expecting does not exist on our page.
- Using a strict TDD approach, we would write just enough HTML code to make our test pass.
```html
<section id="poems"></section>
```
- We have written our first feature test and moved from the red to the green using a TDD approach.

---
#### Feature Test II: Setup
- we want to write a test to check if the application saves the title and text of a user’s poem when they press the submit button.
- we want to write the setup, exercise, and verification phases of our test.
- The functionality we want to test is:
  - The user enters text into a text input element (the poem)
  - The user enters text into a second text input element (the title of the poem)
  - The user presses a submit button
```js
  describe('demo poetry web app', () => { 
    it('saves the user poem and title', () => {
      const title = 'Words Birth Worlds';
      const poem = 'Our words are marvelous weapons with which we could behead the sun';
    });
  });
```
- In the setup phase for this test, we create variables to represent a user’s input to the title and poem fields on the home page.

#### Feature Test II: Exercise
```js
describe('demo poetry web app', () => { 
    it('saves the user poem and title', () => {
      // Setup
      const title = 'Words Birth Worlds';
      const poem = 'Our words are marvelous weapons with which we could behead the sun';
     // Exercise
      browser.url('/');
      browser.setValue('input[id=title]', title);
      browser.setValue('textarea[id=poem]', poem);
      browser.click('input[type=submit]');
    });
  });
```
- First, we will set the URL of the browser to go to the root of our project using the `.url` method
- Next, we will use the `.setValue` method, which sends a sequence of keystrokes to an element, based on a string argument.
  - We will use `.setValue()` to mimic a user entering the title and poem into the corresponding HTML input elements at the root of our web app.
  - The first argument passed to `.setValue()` is the CSS selector that references an HTML element, and the second argument is the value you want to assign that element.
- To complete the exercise phase of our test we would use the `.click` method to mimic a user clicking on a submit button.

#### Feature Test II: Verify
- We will compare the actual results of exercising the code with the expected results.
- In the case of our poetry app, we want to verify that once a user submits a poem, the section of the app’s webpage that we have decided will display the poems includes that poem.

```js
const {assert} = require('chai');

describe('User visits root', () => {

  describe('demo poetry web app', () => { 
    it('saves the user poem and title', () => {
      // Setup
      const title = 'Words Birth Worlds';
      const poem = 'Our words are marvelous weapons with which we could behead the sun;
     // Exercise
      browser.url('/');
      browser.setValue('input[id=title]', title);
      browser.setValue('textarea[id=poem]', poem);
      browser.click('input[type=submit]');
      // Verify
      assert.include(browser.getText('#poems'), title);
      assert.include(browser.getText('#poems'), poem);
    });
  });
});
```
- the Chai Assertion Library allows us to use the `.include` method to check if the string that is returned from `.getText()` includes the substrings of the title and poem that the user has submitted

---
#### Stuck In The Red
- The error message describes the HTML issue that is preventing our test from continuing.
- To address this error message, we would create an <input> with the ID, title in our index.html file. It would look like this:
```html
<label for="title">Title</label>
<input id="title">
```
- we will get a step further and receive an error message that tells us the next line of HTML code we need to write
- This error message tells us we are missing a <textarea> element with the ID, poem. We can address this by adding the following to our index.html:
```html
<label for="poem">Your poem:</label>
<textarea id="poem"></textarea>
```
- Running the test again would give us a similar error message concerning the input element with the type equal to submit.
```html
<input type="submit">
```
