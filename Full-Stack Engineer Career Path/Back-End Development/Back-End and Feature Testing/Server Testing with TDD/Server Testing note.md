## Status Codes
- Verifying status codes provide the most basic level of confidence that the server is functioning correctly.
```js
//index-test
describe('root page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).
      get('/');
      assert.equal(response.status, 200);
    });
  });
});
```
```js
//index.js
router.get('/', (req, res) => {
  res.send()
});
```

---
## Response Content
- we need to make sure the server is responding with the correct content.
- We can organize our tests into two categories:
  - “Happy Path” — expected use cases of our application
  - “Sad Path” — unexpected or invalid use of our application
- As an example, after requesting a valid profile page for “My Name”, you may receive the following response content:
```js
response.text = '<div><div id="my-name">My Name</div></div>';
```
- You can retrieve the content of #my-name and check it using the following:
```js
assert.include(parseTextFromHTML(response.text, '#my-name'), "My Name"); //True
```
- We could also write a separate test to check the corresponding “sad path”. Perhaps there is not yet a page for “Your Name”, so you should not receive a response containing similar HTML. We use `.notInclude()` to verify that the response is not including “Your Name” :
```js
assert.notInclude(parseTextFromHTML(response.text, '#my-name'), "Your Name"); //True
```
- we are identifying the HTML elements by their ID using our `parseTextFromHTML()` helper but you can use any selectors supported by the jsdom library.

---
## Refactoring
### Route Parameters
- `'welcome/:username' => '<h1>Your Name is ' + req.params.username +'</h1>'`

```js
//profile-test.js
describe('profile page', () => {
  describe('GET request', () => {
    it('greets alice', async () => {
        const response = await request(app).
        get('/profile/alice');
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome alice!');
    });
    it('greets bob', async () => {
        const response = await request(app).
        get('/profile/bob');
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome bob!');
    });
  });
});
```
```js
//profile.js
router.get('/:username', (req, res) => {
    res.send(`<h1 id="welcome-message">Welcome ${req.params.username}!</h1>`);
```

### Handlebars
- On a large project, this could make it difficult for the front end developer to organize and maintain.
- An improved approach to this is using a templating library like Handlebars to separate the HTML view from the JavaScript controller.
```js
//profile.js
router.get('/:username', (req, res) => {
    const username = req.params.username;
    res.render('profile', {username});
});
```
```js
//profile.handlebars
<h1 id="welcome-message">Welcome {{ username }}!</h1>
```
```js
//profile-test
describe('profile page', () => {
  describe('GET request', () => {
    it('greets user with custom message', async () => {
        const username = 'alice';
        const response = await request(app).
        get('/profile/' + username);
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome ' + username + '!');
    });
  });
});
```

## API Errors
```js
//messages-tests.js
const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

describe('/messages', () => {
  
  describe('POST', () => {
    describe('when the Message is valid', () => {
      it('redirects to the index', async () => {
        const author = 'Inquisitive User';
        const message = 'Why Test?';

        const response = await request(app)
          .post('/messages')
          .type('form')
          .send({author, message});

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
      });
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Server Testing';

        const response = await request(app)
          .post('/messages')
          .send({message});
          assert.equal(response.status, 400)
          assert.equal(JSON.parse(response.text).message, 'Every message requires an author')
        });
    });

  });
});
```
```js
//messages.js
router.post('/', (req, res) => {
  const {author, message} = req.body;

  if (author === undefined) {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: 'Every message requires an author' }));
    return
  }
  
  res.redirect('/');

});
```
