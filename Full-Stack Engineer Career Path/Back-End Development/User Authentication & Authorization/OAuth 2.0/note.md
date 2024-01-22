An API is the part of a server that sends and receives data (including logging-in) <br>
There are three main types of API authentication:
- HTTP Basic Auth
- API Keys
- OAuth

### HTTP Basic Auth
- HTTP Basic Auth is the oldest (since 1999) and simplest method of authentication.
- It simply requires you to send your username and password every time you communicate with the web page
- The reason this isn’t necessary when you use your browser is because of cookies which stores the crendentials

### API Keys
- An API token is a unique string of letters and numbers generated for each user.
- API Keys are too long and complex to be practical for everyday users to use them to log in

### OAuth
- Sometimes we don’t even have to create a username and password for a new account. Instead, we can sign in with Google, LinkedIn, Twitter, and more. This is possible because of OAuth.

##### Step 1: Redirect User to Provider for Authorization (for example Github)
  - https://www.codecademy.com/users/auth/github?scope=public_repo%2Cuser%3Aemail - that will redirect you to a specific Github login screen
##### Step 2: User Grants Authorization
  - You can now log in to your GitHub to authenticate yourself
  - GitHub will tell you exactly what permissions Codecademy is requesting, and will ask you whether you want to grant Codecademy access to these permissions.
##### Step 3: Redirect User to Application
  - If you choose to authorize Codecademy, you will be redirected back to Codecademy along with a short authorization code.
##### Exchange for Access Grant
  - Codecademy will request an access token from the GitHub API, which will provide the authorization code and other authentication details in a POST request.
##### Step 5: Grant Access Token
  - Finally, after receiving this request, GitHub can either generate one or two tokens. If it only generates one, then it will generate an access token.
##### Step 6: Create Connection
  - The access token grants the requested permissions to Codecademy so that you can log in.
![img](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/authentication-authorization/Cybersecurity_OAuth_v2-05.svg)

---
## OAuth Tokens
### Access Tokens
- Access tokens are used to make API requests on behalf of the user and represent the authorization of a specific application to access specific parts of a user’s data.
- Access tokens are very short-lived, and they only last anywhere from a few minutes to just hours.
- Refresh tokens are longer lived than access tokens and are used by applications to get new access tokens without prompting the user.

### OAuth 2.0 Grant Types
OAuth 2.0 grant types, also known as flows, describe multiple ways to obtain access tokens. Flows involve two main parts:
- Redirecting the user to the OAuth provider and obtaining an access token
- Using the access token to gain restricted access

#### Client Credentials Grant
- A Client Credentials Grant is used when applications request an application token to access their own resource.
- This grant type has a limited use case because it’s only used when the resource server and the authentication server are the same entity.

#### Authorization Code Grant
- The Authorization Code Grant is the most widely used grant for publicly available applications.
- To use this grant type, the webserver must have the capability to store client credentials securely.
- This approach uses browser redirection to communicate between the resource server and the authorization server.
-  The client will obtain an authorization code and then exchange it for an access token.

##### Proof Key for Code Exchange (PKCE)
PKCE is an extension to the Authorization Code flow, and it is used to prevent attacks and to securely perform the OAuth exchange from public clients.

#### Device Code Grant
- The Device Code Grant is used for devices that have no browser and/or have limited input capability to input an access token.
- Some examples of this might be smart TV apps.
