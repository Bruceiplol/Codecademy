# Cross-Site Scripting (XSS) Attacks
- occurs when a web application renders unsanitized input to the front end of an application.
- An attacker takes advantage of this vulnerability by injecting malicious code, generally in the form of JavaScript, through the browser.

### Stored XSS
- A stored XSS vulnerability occurs when a web server stores an unsanitized user input and displays it to other users.
- When a victim clicks a link, malicious code can send the victim’s cookie to another server or directly modify the affected site to steal usernames, passwords, or implement other phishing techniques.
- code will then be stored whenever a user requests to view that review, and the code will be executed on their end.
![Stored XSS](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_Stored_v2-03.svg)

### Reflected XSS
- Reflected XSS occurs when a user’s input is immediately returned back to the user. This return may come in the form of an error message, a popup, or a search term.
- In these instances, the malicious code is never stored by the server. Rather, it exists as a value in the URL or request. the vulnerable code will live on the server.
- The site might send a `GET` request to `/profile` for example. Within that `GET` request, the vulnerable code would be corrupted and execute the malicious code that’s sent with the payload.
- `http://localhost:8000/search?q=<script>document.body.style.background = "red"</script>`
![Reflected XSS](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_Reflected_v2.svg)

### DOM-Based XSS
- The DOM, short for Document Object Model, is used to help scripts and the underlying webpage interact.
- When user input is interpreted by the DOM, an attacker is able to inject malicious code there.
- these attacks are completely client-side, the vulnerable code lived within the .html file
- an attack payload is executed by altering the DOM in the victim’s browser.
- When a client-side script is executed, it can access various properties of the page and change their values.
- img tags have a common attribute called onerror that executes javascript code instantly if an image does not exist.
- `<img src="bad_image" onerror="alert('Hacked!')">`
![DOM-Based XSS](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_DOM_v2.svg)

## Identifying XSS Vulnerabilities
- As with any vulnerability, it is important that we investigate any potential input areas. When looking at the application, consider all possible fields. Comments, usernames, custom settings, and parameters all provide great starting points.
- Once we have identified a potential injection point, we can begin testing various inputs to create a proof-of-concept payload (POC).
- A POC payload will demonstrate that an issue exists, without causing damage. The most basic POC payload is shown below.
```
<script>alert(1);</script>
//other alternative
<img src="X" onerror=alert(1);>
//other alternative
<b onmouseover=alert(1)>click me!</b>
//other alternative
<body onload=alert('test1')>

```
- If a web server is not properly sanitizing user input, this will return a pop-up box
- many systems will take a flawed approach to protection and block certain words.

## Preventing XSS Vulnerabilities
- XSS is preventable with input sanitization and application-level firewalls.
- Sanitization is the process of removing/replacing problematic characters with safe versions.
- we can generally succeed in preventing XSS attacks by removing characters such as <, >, ", =, and potentially dangerous keywords.
- Rather than remove characters, we can also replace them with HTML-encoded versions of the characters.
- For example, the < character would be converted to the “<” string. 

### Securing Cookies
- An express server that uses `express-session` to store cookies has the properties `httpOnly` and `secure` to configure how to store and send cookies.
- Setting `httpOnly` and `secure` to `true` helps mitigate the risk of client-side script accessing the protected cookie.
```node
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true
    },
  })
);
```

### Setting Security Headers
- we can include the `helmet` package to edit HTTP headers.
- Helmet.js is a collection of 15 Node modules that interface with Express. Each module provides configuration options for securing different HTTP headers.
- One of them being the `contentSecurityPolicy` which is an added layer of security that helps to detect and mitigate certain types of attacks.
- by just including this package in your express app, 11 of these modules (including the content security policy module) will be configured automatically.
```node
const helmet = require("helmet");
app.use(helmet());
```

### Data Validation and Sanitization
- In the Reflected and Stored XSS Attacks, we saw how an attacker can inject malicious code into the server and/or database using a form.
- we can use sanitization in order to reformat data so no malicious code is sent.
- validation checks if the input meets a set of criteria (such as a string contains no standalone single quotation marks), whereas sanitization modifies the input to ensure that it is valid (such as removing single quotes).
- one common package is `express-validator`
- With express-validator, we can verify if a string matches a certain format by importing certain functions such as `check`
-  it can be used as a middleware within our endpoints, to validate any input that’s submitted within objects attached to `req`
```node
const { check } = require("express-validator");

app.post("/login", [
  check('email').isEmail(),
  check('password').isLength({min:5}),
], (req, res) => {});
//Notice how we’re using an array since we can pass in multiple check‘s for input data.
```

### DOM-Based Precautions
```
//XSS vulnerability
// Attribute:
element.innerHTML = "<HTML> Tags and markup";
// Method:
 document.write("<HTML> Tags and markup");

//one can replace these methods with an attribute like textContent.
// Will add as an actual HTML element.
element.innerHTML = "<maliciousHTML>";
// Will render as text on the webpage.
element.textContent = "<displaysAsText>";

```
document.write("<b>Current URL</b> : " + document.baseURI);
/=>
document.getElementById("contentholder").textContent = document.baseURI;

<body>
    <section>
      <b>Current URL:</b><span id="contentholder"></span>
      ...
    </section>
</body>
```
