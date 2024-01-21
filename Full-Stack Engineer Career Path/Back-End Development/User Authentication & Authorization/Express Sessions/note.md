## Installing express-session
```
npm install express-session
```
- Once the session middleware is implemented, each user that navigates to our app will have a unique session generated for them.
- This allows us to store their session data server-side under a session identifier and easily retrieve it.
```js
const session = require("express-session")
```

---
## express-session Configuration
- `secret`: The `secret` property is a key used for signing and/or encrypting cookies in order to protect our session ID.
- `resave`: Setting this option to `true` will force a session to be saved back to the session data store, even when no data was modified. Typically, this option should be `false`.
- `saveUninitialized`: If it’s set to `true`, the server will store every new session, even if there are no changes to the session object. This might be useful if we want to keep track of recurring visits from the same browser, but overall, setting this property to `false` allows us to save memory space.

```js
app.use(
  session({
    secret: "D53gxl41G",
    resave: false,
    saveUninitialized: false,
  })
);
```

---
## Storing Session Data
Sessions are typically stored in three different ways:
- In memory (this is the default storage)
- In a database like MongoDB or MySQL
- A memory cache like Redis or Memcached

- `express-session` provides an in-memory store called, `MemoryStore()`. If no other store is specified, then this is set as the default storage.
```js
const store = new session.MemoryStore();

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
```
> Note: Storing in-memory sessions is something that should be done only during development, NOT during production due to security risks.

---
## Cookies
- We should make use of client-side storage so that the user’s browser can automatically send over the session identifier with each incoming HTTP request.
- we’ll tell the client browser to create a cookie that stores the session ID.
- We will also modify cookie attributes to add a bit of security.

```js
app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 1000 * 60 *60 * 24, secure: true, sameSite: "none" },
    saveUninitialized: false,
    resave: false,
  })
);
```
- The `maxAge` property sets the number of milliseconds until the cookie expires. (24 hours in this case)
- `secure` attribute: it’s only sent to the server via HTTPS.
- `sameSite` property and setting it to `"none"` in order to allow a cross-site cookie through different browsers.
- Other cookie properties include:
  - cookie.expires
  - cookie.httpOnly
  - cookie.sameSite

---
## Logging In
- If a user logs in with the correct credentials, we want to initiate a session.
- We can do this by first looking up the user in our database and then verifying that the password is correct.
- Once credentials are confirmed, we’ll add data to our session.
- Once the user is logged in we’ll add a property, `authenticated` within our session object and assign it to `true`.
- We’ll also set `user` in the session data and assign it the `username` and `password` we received:
```js
// Look up user in database, if found, confirm password:
if (password == "codec@demy10") {
  // Attach an `authenticated` property to our session:
  req.session.authenticated = true;
  // Attach a user object to our session:
  req.session.user= {
    username,
    password,
  }
}
```
> Note: we are demonstrating using a hardcoded password. However, in production, you always want to encrypt your password.

---
## Accessing Session Data
- Data in a session is serialized as JSON when stored, so we’re able to store and access data in nested objects.
- One common use case of session data is to protect specific routes.
- We can check that the authorized property exists within the session, and if it’s set to true before we move on to the next route handler.

```js
function authorizedUser(req, res, next) {
  // Check for the authorized property within the session
  if (req.session.authorized) {
    // next middleware function is invoked
    res.next();
  else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
};

app.get("/protected", authorizedUser, (req, res, next) => {
 res.render("protected", { "user": req.session.user });
});
```
