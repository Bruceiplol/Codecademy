# Framework
- is a collection of code to make it easier to accomplish a specific task.
- developers must follow the rules and syntax put forth by the framework to use it properly.
- This workflow might include things like accessing databases, generating HTML, handling URL routing, and more!

#### Benefits
- A server-side framework can handle a lot of the back-end responsibilities without you needing to come up with a custom solution, which saves a lot of time.
- access to libraries built to work with the framework
- existing resources and documentation for solving common problems
- improved security

## Express.js
- a server-side framework written in JavaScript and built to work with Node.js.
- comes with included code that makes implementing some core functionality much quicker than doing it from scratch.

Example:
```js
const express = require('express');
const app = express();
  
app.get('/', (req, res) => {
  res.send('<h1>Hello from your Express.js server!!</h1>');
});
  
app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
```
