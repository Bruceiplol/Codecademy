## Express.Router
- To use a router, we mount it at a certain path using ```app.use()``` and pass in the router as the second argument.

```js
const monstersRouter = express.Router();
app.use('/monsters', monstersRouter);
```
- Inside the `monstersRouter`, all matching routes are assumed to have `/monsters` prepended, as it is mounted at that path. `monstersRouter.get('/:id'`) matches the full path `/monsters/:id`.

--- 
- Generally, we will keep each router in its own file, and require them in the main application.

```js
// monsters.js
const express = require('express');
const monstersRouter = express.Router();

const monsters = {
  '1': {
    name: 'godzilla',
    age: 250000000
  },
  '2': {
    Name: 'manticore',
    age: 21
  }
}

monstersRouter.get('/:id', (req, res, next) => {
  const monster = monsters[req.params.id];
  if (monster) {
    res.send(monster);
  } else {
    res.status(404).send();
  }
});

module.exports = monstersRouter;
```

```js
// main.js
const express = require('express');
const app = express();
const monstersRouter = require('./monsters.js');

app.use('/monsters', monstersRouter);
```


