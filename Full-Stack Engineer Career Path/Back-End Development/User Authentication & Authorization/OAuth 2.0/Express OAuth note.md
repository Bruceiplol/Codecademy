## Introduction
- OAuth is an authorization framework that provides specific authorization flows which allow unrelated servers to access authenticated resources without sharing any passwords.
-  It works by allowing applications to authenticate with third-party services in exchange for an access token which can be passed with an HTTP request to access protected content.

four OAuth Roles:
- Resource Owner: the user who authorizes an application to an account
- Resource Server: the API server that accepts access tokens and verifies their validity
- Authorization Server: the server that issues access tokens
- Client: the application that requests the access tokens

---
## Installing oauth2-server
```
npm install oauth2-server
```
```js
const OAuth2Server = require('oauth2-server');
```

## Creating an OAuth 2.0 Server Instance
```js
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60
})
```
- The `OAuth2Server object` requires a model object which contains functions to access, store, and validate our access tokens. We’ll be writing them separately in a file named `model.js`.
- `OAuth2Server` can be supplied with additional options in the constructor. To pass tokens inside the URL, we’ll set the `allowBearerTokensInQueryString` attribute to `true`
- The access token lifetime can also be configured as an option using the `accessTokenLifetime` attribute. The lifetime is set in seconds, and we can set the access token lifetime to one hour

## Registering Client to Application
OAuth defines two types of clients — confidential clients and public clients.
- Public clients are NOT able to store credentials securely and can only use grant types that do not use their client secret.
- Confidential clients are applications that can be registered to an authorization server using credentials.
  - Those credentials, a client ID and a client secret, can be secured without exposing them to a third party.
  - They require a backend server to store the credentials.
  - A client’s ability to securely store credentials determines which type of OAuth authorization flows should be used.

We’ll be implementing the Client Credentials flow to obtain an access token for authentication. they’ll need:
- A Client ID: a public identifier for apps that is unique across all clients and the authorization server.
- A Client Secret: a secret key known only to the application and the authorization server.

```js
//simulated database
module.exports = {
  confidentialClients: [{
    clientId: 'secretapplication',
    clientSecret: 'topsecret',
    grants: [
      'client_credentials'
    ]
  }],
  tokens: []
}
```

- we create an attribute named confidentialClients and set it equal to an array.
- Within the array, we create an object with the clientId and clientSecret, and specify 'client_credentials' in our array of grant types.
- we create another property named tokens and set it equal to an empty array as a location to store access tokens.

---
## getClient() in model
- The `getClient()` function is an example of a required model function for all flows.
- The function is used to retrieve a client using a Client ID and/or a Client Secret combination.
- The `getClient()` function takes two arguments: `clientId` and `clientSecret`.
- We must write a database query to match the provided arguments and its implementation will vary depending on the type of database used.
- JavaScript as our in-memory database, we can use the .filter() method to evaluate

```js
const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client)=>{
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}

module.exports = {
  getClient: getClient
}
```

## saveToken() in model
- This function stores the access token as an object to a database when an access token is obtained.
- The `saveToken()` function is implemented with three arguments: `token`, `client`, and `user`.

```js
const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }
  db.tokens.push(token);
  return token;
}

module.exports = {
  getClient: getClient
  saveToken: saveToken
}
```

## getUserFromClient() in model
- Certain grant types have specific functions that must be implemented for them to work.
- The Client Credentials grant type must have the `getUserFromClient()` function
- The `getUserFromClient()` function is invoked to retrieve the user associated with the specified client.
- We are not using a user in our application so we can return an empty object.

```js
const getUserFromClient = (client) => {
  return {};
}
module.exports = {
  // Other modules to export
  getUserFromClient: getUserFromClient
}
```

---
## Obtaining Token Handler
- we need to create a callback function to handle obtaining the access token whenever a URL is requested in our application.

```js
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
      .then((token) => {
          res.json(token);
      })
      .catch((err) => {
        res.status(err.code || 500).json(err);
      });
}

app.all('/auth', obtainToken);

```
- `obtainToken()` that takes the HTTP request and HTTP response as arguments—`req` and `res`.
- Inside `obtainToken()`, we create a new variable named `request` and set it to a new instance of `OAuth2Server.Request()`, passing the HTTP request, `req`, as the argument:
- We’ll also create a new variable named `response` and set it to a new instance of `OAuth2Server.Response()`, taking in `res` as the argument
- The `oauth.token()` returns the access token.
- We use the `.then()` method to return a promise.
- If the token method is successful, we will send the access token back to the client using the `.json()` Express method.
- We’ll chain the .catch() method to handle any errors if the `.token()` method fails.
- the error can be sent back to the client using the `.json()` method.
- To make use of our `obtainToken()` function, we can define a new route and pass `obtainToken()` as a callback function. We use the `.all()` method to handle all types of HTTP requests since we will eventually use a POST request on the route.

---
## getAccessToken() in model
-  we can restrict access to content unless a user is authenticated with a valid access token.
-  we implement the `getAccessToken()` function to retrieve existing tokens that were previously saved when the `saveToken()` function is invoked.
-  The `getAccessToken()` function is required when the `.authenticate()` method is used on an `OAuth2Server` instance. `getAccessToken()` is declared with one parameter—`accessToken`.
-  When the function is invoked the `accessToken` is checked against the tokens stored inside the db.js to see if there is a match.

```js
const getAccessToken = (accessToken) => {
 let tokens = db.tokens.filter((savedToken)=>{
   return savedToken.accessToken === accessToken;
 })
 return tokens[0];
}
```

---
## Authentication Middleware
- `authenticateRequest()`, a middleware function to handle authenticating access tokens inside our application.
- we can add authenticateRequest as a middleware function to a route to restrict access.

```js
const authenticateRequest = (req, res, next) => {

  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send(err);
    })
}
```

---
## Testing Endpoints with HTTP
-  We can make an HTTP POST request to the /auth route to obtain an access token.
```node
POST http://localhost:4001/auth
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15

grant_type=client_credentials
```
```node
GET http://localhost:4001/secret
Authorization: Bearer <Access Token>
```


- In the HTTP header, we set Authorization to Basic and the base64 encoded Client ID and Client Secret.
- In the POST request data, we provide grant_type=client_credentials. 
