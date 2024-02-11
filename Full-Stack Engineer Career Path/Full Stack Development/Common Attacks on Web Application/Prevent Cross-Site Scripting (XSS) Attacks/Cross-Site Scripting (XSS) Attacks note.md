# Cross-Site Scripting (XSS) Attacks
- occurs when a web application renders unsanitized input to the front end of an application.
- An attacker takes advantage of this vulnerability by injecting malicious code, generally in the form of JavaScript, through the browser.

### Stored XSS
- A stored XSS vulnerability occurs when a web server stores an unsanitized user input and displays it to other users.
![Stored XSS](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_Stored_v2-03.svg)

### Reflected XSS
- Reflected XSS occurs when a user’s input is immediately returned back to the user. This return may come in the form of an error message, a popup, or a search term. In these instances, the malicious code is never stored by the server. Rather, it exists as a value in the URL or request.
![Reflected XSS](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_Reflected_v2.svg)

### DOM-Based XSS
- The DOM, short for Document Object Model, is used to help scripts and the underlying webpage interact.
- When user input is interpreted by the DOM, an attacker is able to inject malicious code there.
- these attacks are completely client-side.'
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
