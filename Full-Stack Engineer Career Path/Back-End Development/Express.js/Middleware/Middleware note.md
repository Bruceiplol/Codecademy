# Middleware
- “Don’t Repeat Yourself” (DRY)
- perform logic on the request and response objects
  - inspecting a request
  - performing some logic based on the request
  - attaching information to the response
  - attaching a status to the response
  - sending the response back to the user
  - simply passing the request and response to another middleware.

```js
app.use((req, res, next) => {
  console.log('Request received');
});
```
- `app.use()` takes a callback function that it will call for every received request.
- In this example, every time the server receives a request, it will find the first registered middleware function and call it.
- The middleware stack is processed in the order they appear in the application file

```js
app.use((req, res, next) => {
  console.log("A sorcerer approaches!");
  next();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log("The sorcerer is casting a spell!");
  next();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log(`The sorcerer has cast ${req.params.spellname}`);
  res.status(200).send();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log("The sorcerer is leaving!");
});

// Accessing http://localhost:4001/magic/fireball 
// Console Output:
// "A sorcerer approaches!"
// "The sorcerer is casting a spell!"
// "The sorcerer has cast fireball"
```

- We can see that the final matching call was not printed. This is because the previous middleware did not invoke the `next()` function to run the following middleware.
- it is useful to have next() as a separate function call. The biggest reason being we don’t always want to pass control to the next middleware in the stack.

### Route-Level app.use() - Single Path

`app.use([path,] callback [, callback...])` <br>

```js
app.use('/sorcerer', (req, res, next) => {
  console.log('User has hit endpoint /sorcerer');
  next();
});
```

- optional arguments for functions are placed in square brackets ([]). 
- if someone visits our web page’s ‘/sorcerer’ endpoint. Since the method `app.use()` was used, it won’t matter if the user is performing a `GET`,a `POST`, or any other kind of HTTP request.
- this middleware function will not execute if the user hits a different path (for instance: `'/spells'` or `'/sorcerer/:sorcerer_id'`).

### Route-Level app.use() - Multiple Paths
The path for which the middleware function is invoked; can be any of:
- A string representing a path.
- A path pattern.
- A regular expression pattern to match paths.
- An array of combinations of any of the above. 

### Middleware Stacks

```js
const authenticate = (req, res, next) => {
  ...
};

const validateData = (req, res, next) => {
  ...
};

const getSpell = (req, res, next) => {
  res.status(200).send(getSpellById(req.params.id));
};

const createSpell = (req, res, next) => {
  createSpellFromRequest(req);
  res.status(201).send();
};

const updateSpell = (req, res, next) => {
  updateSpellFromRequest(req);
  res.status(204).send();
}

app.get('/spells/:id', authenticate, getSpell);

app.post('/spells', authenticate, validateData, createSpell);

app.put('/spells/:id', authenticate, validateData, updateSpell);
```

- we created reusable middleware for authentication and data validation. 
- We use the `authenticate()` middleware to verify a user is logged in before proceeding with the request
- and we use the `validateData()` middleware before performing the appropriate create or update function.


---
---
## Express Open-Source Middleware
https://expressjs.com/en/resources/middleware.html

---
### Open-Source Middleware: Logging
- Express already exists as an open-source package that we can install and use to build upon.
- morgan, an open-source library for logging information about the HTTP request-response cycle in a server application.
- `morgan()` is a function that will return a middleware function
- the return value of `morgan()` will be a function, that function will have the function signature `(req, res, next)` that can be inserted into an `app.use()`
- For example, `morgan('tiny')` will return a middleware function that does a “tiny” amount of logging.
- https://github.com/expressjs/morgan#api
- `morgan('dev')`: with the HTTP method, URL, status code, response time, content length, and one that changes colors of the status code output based on the code

```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

### Open-Source Middleware: Body Parsing
- An HTTP request can include a body, a set of information to be transmitted to the server for processing.

```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())

/*what it does similarly
const bodyParser = (req, res, next) => {
  let queryData = '';
  req.on('data', (data) => {
    data = data.toString();
    queryData += data;
  });
  req.on('end', () => {
    if (queryData) {
      req.body = JSON.parse(queryData);
    }
    next();
  });
};
*/
```

---
### Error-Handling Middleware
- Error handling middleware needs to be the last `app.use()` in your file. before `app.listen()`
- if we anticipate an operation might fail, we can invoke our error-handling middleware.
  - We do this by passing an error object as an argument to `next()`.
  - Usually, `next()` is called without arguments and will proceed through the middleware stack as expected.
  - When called with an error as the first argument, however, it will call any applicable error-handling middleware.

```js
app.use((req, res, next) => {
  const newValue = possiblyProblematicOperation();
  if (newValue === undefined) {
    let undefinedError = new Error('newValue was not defined!');
    return next(undefinedError);
  }
  next();
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});
```

```js
//inside app.xxx()
return res.status(404).send('error!');

// become this
const err = new Error('error!');
err.status = 400;
return next(err)
```

##### Open-Source error handler
```js
const errorHandler = require('errorhandler');
...
app.use(errorHandler());
```
