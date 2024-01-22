# Passport.js
- Passport.js is a flexible authentication middleware for Node.js that can be added to any Express-based application.
- With Passport.js we can implement authentication using the concept of *strategies*.
- a local Passport strategy, `passport-local`, and authenticating users using a username and password.
- In order to use it, we need to configure it and implement cookies and sessions for persistent logins.

```
npm install passport passport-local
```
```js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize()); //initializes the authentication module
app.use(passport.session()); //allow for persistent logins: alters the request object and is able to attach a ‘user’ value that can be retrieved from the session id.
```

### Passport's Local Strategy
```js
passport.use(new LocalStrategy(
  function(username, password, done) {
    // …
  }
));
```
parameters:
- `username`
- `password`
- A callback function called `done`.
  - The purpose of the `done` callback is to supply an authenticated user to Passport if a user is authenticated.

1. Verify login details in the callback function.
2. If login details are valid, the `done` callback function is invoked and the user is authenticated.
3. If the user is not authenticated, pass `false` into the callback function.

The `done` callback function takes in two arguments:
- An error or `null` if no error is found.
- A user or `false` if no user is found.

```js
passport.use(new LocalStrategy(
  function (username, password, done) {
    // Look up user in the db
    db.users.findByUsername(username, (err, user) => {
      // If there's an error in db lookup, 
      // return err callback function
      if(err) return done(err);

      // If user not found, 
      // return null and false in callback
      if(!user) return done(null, false);

      // If user found, but password not valid, 
      // return err and false in callback
      if(user.password != password) return done(null, false);

      // If user found and password valid, 
      // return the user object in callback
      return done(null, user)
    });
  })
);
```

### Serializing and Deserializing Users
- the user data persist across HTTP requests by serializing and deserializing users.
- Serializing a user determines which data of the user object should be stored in the session, usually the user `id`.
- The `serializeUser()` function sets an `id` as the cookie in the user’s browser,
- and the `deserializeUser()` function uses the `id` to look up the user in the database and retrieve the user object with data.
- When we serialize a user, Passport takes that user `id` and stores it internally on `req.session.passport` which is Passport’s internal mechanism to keep track of things.
```js
passport.serializeUser((user, done) => {
  done(null, user.id);
});
```
- The first argument in the `done()` function is an error object.
- second argument, we pass in the value that we want to store in our Passport’s internal session, the user `id`.

retrieved from the session via the deserializeUser() function. 
```js
passport.deserializeUser((id, done) => {
  // Look up user id in database. 
  db.users.findById(id, function (err, user) {
    if (err) return done(err); 
    done(null, user);
  });
});
```

---
## Logging In
- In order to log in a user we first need a POST request that takes in user credentials.
- We can add passport middleware in order to process the authentication and, if successful, serialize the user for us:
```js
app.post("/login",
  passport.authenticate("insertStrategyHere", { failureRedirect : "/insertPathHere"}),
  (req, res) => {
    res.redirect("profile");
  }
);
```
`passport.authenticate()` takes in:
- A string specifying which strategy to employ. In this case, we should use a `local` strategy.
- An optional object as the second argument. In this case, we should set the `failureRedirect` key to `"/login"`. This will redirect the user to the `/login` page if the login process fails.

- Once implemented, we can update the `"/profile"` endpoint to make use of the serialized user found in the request object, `req.user`:
```js
app.get("/profile", (req, res) => {
  res.render("insertDashboardNameHere", { user: req.user });
}); 
```

---
## User Registration
Instead of a database, we’ll use an array holding data:
```js
// users:
let records = [
  {
    id: 1,
    username: "sam",
    password: "codec@demy10",
  },
  {
    id: 2,
    username: "jill",
    password: "p@ssword123!",
  },
];
```

```js
function createUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = {
      // getNewId creates an updated ID 
      // for the new user
      id: getNewId(records),
      ...user,
    };
    records = [newUser, ...records];
    resolve(newUser);
  });
};
```

```js
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // imported helper function: 
  // db.users.createUser
  const newUser = await db.users.createUser({ username, password });
  if (newUser) {
    res.status(201).json({
      msg: "Insert Success Message Here",
      insertDataHere
    });
  } else {
    res.status(500).json({ msg: "Insert Failure Message Here" });
  }
```
> NOTE: In a real development environment, passwords would be hashed whenever a new user registers.

---
## Logging Out
- Passport.js exposes a `logout` function within the request object: `req.logout`.
```js
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
```
