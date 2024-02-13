## Input Sanitization & Validator.js
- One method of preventing SQL injection is to sanitize inputs.
- Input sanitization is a cybersecurity measure of checking, cleaning, and filtering data inputs before using them.
- `validator.js` is a library of string validators and can be used to validate forms and sanitize inputs before using a form value in the application code.
- `express-validator` that wraps `validator.js` functions for use in express applications.
  - isEmail() - Checks if the input is a valid email address.
  - isLength() - Checks if the input is a certain length. An object with min and max can be passed as an argument. 
  - isNumeric() - Checks if the input is numeric.
  - contains() - Checks if the input contains a certain value.
  - isBoolean() - Checks if the input is a boolean value.
  - isCurrency() - Checks if the input is currency-formatted.
  - isJSON() - Checks if the input is JSON.
  - isMobilePhone() - Checks if the input is a valid mobile phone number.
  - isPostalCode() - Checks if the input is a valid postal code.
  - isBefore() and isAfter() - Checks if a date is before or after another date.

```node
app.post('/submit', 
  (req, res) => {
    const response = {
      emailValid: validator.isEmail(req.body.email) ,// Check if the submitted email is valid
      passwordValid: validator.isLength(req.body.password, { min: 5, max: 10 });
// Check if password is a valid length
    }

    res.json({message: response})
});
```

- Another aspect of input sanitization is data sanitization.
- Data sanitization is the process of removing all dangerous characters from an input string before passing it to the SQL engine.
- We can use `validator.normalizeEmail()` function to remove formatting on email inputs to remove potentially dangerous characters.
- We can use the `validator.escape()` function to replace `<`, `>`, `&`, `'`, and `"` characters that could be confused with HTML entities.

```node
console.log(validator.normalizeEmail("     STUDENT@Codecademy.com"))
// The above code will print out student@codecademy.com.

console.log(validator.escape("1 < 2"))
// The above code will print 1 &lt; 2.
```

## Prepared Statements: Placeholders
- the best technique to protect against SQL injections is a method called prepared statements.
- Prepared statements are predefined SQL queries that take user input and place them into placeholders using array syntax.
- This minimal change ensures that the input strings are properly escaped and special characters are removed

```node
db.get(`SELECT * FROM Employee  WHERE FirstName = ${req.body.firstName} AND LastName =  ${req.body.lastName}`, (error, results) => {
  ...
});

// reconstruct
db.all("SELECT * FROM Employee  WHERE FirstName = ? AND LastName = ? ", 
  [req.body.lastName, req.body.firstName], 
  (error, results) => {
  ...
});
```

### Prepared Statements: Named Placeholders
- Another way to implement prepared statements is to use named placeholders. Instead of using an array, we use an object to map the parameters to the query variables.
- use named placeholders by replacing the ? with a variable beginning with the $ character, and passing an object that maps to the named placeholder value.

```node
db.all("SELECT * FROM Employee  WHERE FirstName = ? AND LastName = ? ", 
  [req.body.lastName, req.body.firstName], 
  (error, results) => {
  ...
});

//reconstruct
db.all("SELECT * FROM Employee  WHERE FirstName = $firstName AND LastName = $lastName ", 
  {
    $firstName: req.body.firstName,
    $lastName: req.body.lastName
  },
  (error, results) => {
  ...
});
```
