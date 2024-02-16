# Securing Acme Bank: Defending Node Applications

### Securing your headers
- Require the `helmet` package and implement the middleware.
```
const helmet = require("helmet")
app.use(helmet())
```
- Secure the application’s cookies by adding the appropriate properties/values.
```
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true
    }
  })
);
```

### Sanitize and validate inputs on the public forum
