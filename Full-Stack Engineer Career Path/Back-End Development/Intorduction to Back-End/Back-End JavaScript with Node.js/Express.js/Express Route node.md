## Starting A Server
```js
const express = require('express');
const app = express();
```
- The purpose of a server is to listen for requests, perform whatever action is required to satisfy the request, and then return a response.<br>
- we have to tell the server where to listen for new requests by providing a port number argument to a method called ```app.listen()```.
- The second argument is a callback function that will be called once the server is running and ready to receive responses.

```js
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Route
- To tell our server how to deal with any given request, we register a series of routes.
- Routes define the control flow for requests based on the request’s path and HTTP verb.
- ```app.get()``` to register routes to match GET requests.
  - usually take two arguments, a path (usually a string), and a callback function to handle the request and send a response.
  ```js
  const moods = [{ mood: 'excited about express!'}, { mood: 'route-tastic!' }];
  app.get('/moods', (req, res, next) => {
    // Here we would send back the moods array in response
  });
  ```
  - The route above will match any GET request to '/moods'
  - and call the callback function, passing in two objects as the first two arguments. 

### Sending A Response
- Express servers send responses using the ```.send()``` method on the response object.
- .send() will take any input and include it in the response body.
- ```.json()``` sends any JavaScript object passed into it.
  
```js
const monsters = [
  { type: 'werewolf' }, 
  { type: 'hydra' }, 
  { type: 'chupacabra' }
];
app.get('/monsters', (req, res, next) => {
  res.send(monsters);
});
```

#### Route Parameters
- Parameters are route path segments that begin with : in their Express route definitions.
- For example ```/monsters/:id``` will match both ```/monsters/1``` and ```/monsters/45```.
- Express parses any parameters, extracts their actual values, and attaches them as an object to the request object: ```req.params```

```js
const monsters = { 
  hydra: { height: 3, age: 4 }, 
  dragon: { height: 200, age: 350 } 
};
// GET /monsters/hydra
app.get('/monsters/:name', (req, res, next) => {
  console.log(req.params); // { name: 'hydra' }
  res.send(monsters[req.params.name]);
});
```

### Setting Status Codes
- ```res.send()``` has by default sent a 200 OK status code.
- The ```res``` object has a ```.status()``` method to allow us to set the status code, and other methods like ```.send()``` can be chained from it.

```js
const monsterStoreInventory = { fenrirs: 4, banshees: 1, jerseyDevils: 4, krakens: 3 };
app.get('/monsters-inventory/:name', (req, res, next) => {
  const monsterInventory = monsterStoreInventory[req.params.name];
  if (monsterInventory) {
    res.send(monsterInventory);
  } else {
    res.status(404).send('Monster not found');
  }
});
```

### Other HTTP Methods
- ```GET``` request which is probably the most common of all. Every time your browser loads an image, it is making a ```GET``` request for that file!
- ```PUT```: ```app.put()```
  - used for updating existing resources.

#### Using Queries
- It turns out that there was more information in the request in the form of a query string.
- they are indicated with a ? character
- For instance, in ```/monsters/1?name=chimera&age=1```, the query string is ```name=chimera&age=1``` and the path is ```/monsters/1/```
- Express server parses them into a JavaScript object and attaches it to the request body as the value of ```req.query```.
- The ```key: value``` relationship is indicated by the `=` character in a query string, and key-value pairs are separated by `&`.

```js
const monsters = { '1': { name: 'cerberus', age: '4'  } };
// PUT /monsters/1?name=chimera&age=1
app.put('/monsters/:id', (req, res, next) => {
  const monsterUpdates = req.query;
  monsters[req.params.id] = monsterUpdates;
  res.send(monsters[req.params.id]);
});
```

#### Creating An Expression
- `POST` is the HTTP method verb used for creating new resources.
```js
app.post('/monsters', (req, res, next) => {
  const receivedExpression = createElement('monsters', req.query);
  // If the new element is valid
  monsters.push(receivedExpression);
})
```

#### Deleting Old Expressions
- `DELETE` is the HTTP method verb used to delete resources.
- their paths should usually end with a route parameter to indicate which resource to delete.
- Servers often send a 204 No Content status code if deletion occurs without error.

```js
app.delete('/monsters/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, monsters);
  // If the index is valid
  monsters.splice(expressionIndex, 1);
})
```
