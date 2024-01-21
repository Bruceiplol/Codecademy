### Sessions and Cookies
#### Sessions
- A web session refers to a series of user interactions over a time frame. Session data is stored server-side and associated with a session ID.
- there needs to be a system that associates the requests with a specific user and does so in a secure way. This is where sessions come in!
- Think of a session as short-term memory for a web application.

##### Session Security
- Users and web developers should be concerned with session hijacking, an attack in which an attacker steals session identifiers and gains access to the web server as a different person.
- Setting an expiry on the session cookie
  - implement an automatic session expiration on the backend.
  - The session timeout after an idle period is a common feature on bank websites
- Make Session IDs Difficult to Hack
  - Session IDs are just like passwords — the longer and more random, the better.
  - session identifiers should be at least 128 bits long. This helps prevent brute-force attacks where a hacker uses multiple bots to guess IDs.
  - Ensure it does not contain personally identifying information
  - the algorithm to generate an ID doesn’t follow a predefined pattern that makes it easier to guess.
- Enforce HTTPS

#### Cookies
- the session ID is often kept client-side in the form of session cookies.
- Cookies are tiny pieces of data — text files of max 4kb — the browser stores that are automatically sent with HTTP requests to a web application
- A session cookie is set with the first HTTP response from the server and persists until the browser is closed or the cookie expires.

1. A user goes to a site. The web server creates a session and a session ID.
2. In the server’s response, it tells the browser to store a cookie with the session ID (should not include any personal information).
3. The session ID cookie automatically attaches to each subsequent HTTP request to the server.
4. When the server reads the session ID cookie sent with the next HTTP request, it returns the session data associated with the ID.
5. The process continues as long as the session is active.
6. The session and session ID cookie expires after a user closes out the browser, logs out, or a predetermined session length (i.e. an hour) passes.

##### Cookie Security
- Cookies often store sensitive information, especially when they’re used in session management.
- Cookies are also used to store a user’s personal preferences or history, which should also stay secure.

- The first step to securing a cookie could be adding an expiration date or duration so a cookie doesn’t persist longer than it needs to.
- We can specify that information through the `Set-Cookie` header in an HTTP response like so:
```
Set-Cookie: Key=Value; expires=Saturday, 01-May-2021 07:30:10 GMT; HTTPOnly
```
- The HttpOnly attribute for the `Set-Cookie` header makes sure that the cookie’s data is not accessible to a script running client-side.
  - This helps prevent a Cross-Site Scripting (XSS) attack that tries to steal a session cookie and take over the victim’s session, which is extremely common.
- `SameSite` helps prevent Cross-Site Request Forgery (CSRF) attacks.
- `Secure` makes sure cookies are only sent with a request to an HTTPS page.

##### Cookie Downside
-  relying on cookies to be attached for each HTTP request can affect a website’s performance.
-  Cookies are also quite limited in storage.

--- 
### localStorage
- `localStorage` is a newer form of client-side storage.
- These browser files also store data as key-value pairs
- Web applications can choose to store up to 5MB of data in `localStorage`.
- `localStorage` does not interact with the server, but is instead accessed and modified by simple client-side JavaScript code.
- `localStorage` will persist even after a user exits the browser, and will continue to persist until the browser cache is deleted.

- `sessionStorage`, which uses the same syntax as `localStorage`, can hold session data. This storage clears once the browser closes, so, for many use cases, this is more secure.

```
localStorage.setItem('key', 'value');
localStorage.getItem('key');
```

![img](https://static-assets.codecademy.com/content/paths/web-security/sessions-cookies/Art1040-Cookiesvslocaltable-transparent.svg)
