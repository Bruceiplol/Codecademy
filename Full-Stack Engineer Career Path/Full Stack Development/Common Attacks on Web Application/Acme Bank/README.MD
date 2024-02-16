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
- make use of express-validator in order to sanitize and validate any input data.
- Require the express-validator package.
- Protect the POST request for "/public_forum" by validating the req.body.comment.
```
const validator = require("express-validator");
...
    var comment = validator.escape(request.body.comment);
    ...
```

### Protect against SQL injections
- Update the POST request for "/auth", the SQL query to use prepared statements instead of string interpolation for the username and password. SQL can use variables in order to prevent any direct manipulation of the database.
```
app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.get(
      `SELECT * FROM users WHERE username = ? AND password = ?`, [username, password],
      function (error, results) {
      ...
```

### Address Vulnerability on the “Public Forum” page
- Protect the POST request for "/public_forum" by using SQL parameters for the request queries comment and username.
```
app.post("/public_forum", function (request, response) {
  if (request.session.loggedin) {
    var comment = validator.escape(request.body.comment);
    var username = request.session.username;
    if (comment) {
      db.all(
        `INSERT INTO public_forum (username,message) VALUES (?,?)`, [username, comment],
        (err, rows) => {
        ...
```

### Address vulnerability on the “Public Ledger” page
- Protect the GET request for "/public_ledger" by using SQL parameters for the request queries, id and amount.
- Make sure to parse the value from the request as an integer to make sure the data is standardized.
```
app.get("/public_ledger", function (request, response) {
  if (request.session.loggedin) {
    var id = parseInt(request.query.id);
    if (id) {
      db.all(
        `SELECT * FROM public_ledger WHERE from_account = ?`, [id],
        (err, rows) => {
        ...
```

### Path traversal protection
- Use the built-in package, path, in order to set the path starting from the current working directory followed by the string "/history_files/", and then the variable file_name. Store this value in a variable called root_directory.
```
app.post("/download", function (request, response) {
  if (request.session.loggedin) {
    var file_name = request.body.file;

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    // Change the filePath to current working directory using the "path" method
    const root_directory = process.cwd()
    const filePath = path.join(root_directory+ "history_files/" + file_name);
    const filename = path.normalize(filePath)
    console.log(filePath);
```
- Create a variable called rootDir and assign it to "history_files\\". Normalize the filePath variable and store the value in a variable called fileName.
- Within the try/catch block, check if the filename variable contains the value of rootDir. If it doesn’t, set the response to response.end("File not found");. Otherwise, return the content.
```
const rootDir = "history_files\\"
    try {
      if (filename.indexOf(rootDir) < 0) {
        response.end("File not found!")
      } else{
        content = fs.readFileSync(filePath, "utf8");
        response.end(content);
      }
    } catch (err) {
      console.log(err);
      response.end("File not found");
    }
  }
```

### Adding a linter
- You can install a linter package in order to have a consistent format across all your JavaScript files. One popular package is eslint.
```
​​npm install eslint --save-dev
```
- From here you can configure an eslint file: `npx eslint --init`
- This will create an .eslintrc file for you where you can set all the rules for your syntax and formatting rules.
```
√ How would you like to use ESLint? · style       
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard
√ What format do you want your config file to be in? · JavaScript
```
