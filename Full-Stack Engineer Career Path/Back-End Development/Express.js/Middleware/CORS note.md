- If these requests for assets go unchecked, the security of your browser may be at risk.
- As a result, many modern browsers follow security policies to mitigate such risks.
  - the same-origin policy enforces that documents that interact with each other have the same origin (server).
    - An origin is made up of the following three parts: the protocol, host, and port number.
    - As you can see, not having a security policy can be risky, but a security policy like same-origin is a bit too restrictive.
  - cross-origin, which has evolved into the cross-origin resource sharing standard, often abbreviated as CORS.

---
## CORS (cross-origin resource sharing) 
- Cross-origin requests, however, mean that servers must implement ways to handle requests from origins outside of their own.
- CORS allows servers to specify who (i.e., which origins) can access the assets on the server, among many other things.

Example: <br>
You can think of these interactions as a building with a security entrance. For example, if you need to borrow a ladder, you could ask a neighbor in the building who has one. The building’s security would likely not have a problem with this request (i.e., same-origin). If you needed a particular tool, however, and you ordered it from an outside source like an online marketplace (i.e., cross-origin), the security at the entrance may request that the delivery person provide identification when your tool arrives.
<br><br>

- The CORS standard is needed because it allows servers to specify not only who can access the assets, but also how they can be accessed.
- Most servers will allow GET requests, meaning they will allow resources from external origins (say, a web page) to read their assets. HTTP requests methods like PATCH, PUT, or DELETE, however, may be denied to prevent malicious behavior.
- Headers are used to describe requests and responses. The CORS standard manages cross-origin requests by adding new HTTP headers to the standard list of headers.
  - Access-Control-Allow-Origin
  - Access-Control-Allow-Credentials
  - Access-Control-Allow-Headers
  - Access-Control-Allow-Methods
  - Access-Control-Expose-Headers
  - Access-Control-Max-Age
  - Access-Control-Request-Headers
  - Access-Control-Request-Method
  - Origin
- The Access-Control-Allow-Origin header allows servers to specify how their resources are shared with external domains.  
  - When a GET request is made to access a resource on Server A, Server A will respond with a value for the Access-Control-Allow-Origin header.
  - Many times, this value will be *, meaning that Server A will share the requested resources with any domain on the Internet.
  - Other times, the value of this header may be set to a particular domain (or list of domains), meaning that Server A will share its resources with that specific domain (or list of domains).

#### Pre-flight Requests
- Servers don’t just blindly block such requests though; they have a process in place that first checks and then communicates to the client (your web browser) which requests are allowed.
- a standard preflight request will be made before the original request.
  - PUT
  - DELETE
  - CONNECT
  - OPTIONS
  - TRACE
  - PATCH
- Preflight requests use the OPTIONS header. The preflight request is sent before the original request, hence the term “preflight.”
- The purpose of the preflight request is to determine whether or not the original request is safe

#### CORS implementation
Node: `response.setHeader('Content-Type', 'text/html');`
Express: 
```$ npm install cors```
```js
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/hello/:id', function (req, res, next) {
  res.json({msg: 'Hello world, we are CORS-enabled!'});
});

app.listen(80, function () {
  console.log('CORS-enabled web server is listening on port 80');
```
