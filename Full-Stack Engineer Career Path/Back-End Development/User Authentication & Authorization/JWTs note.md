# JSON Web Tokens (JWTs)
- JSON Web Tokens are self-contained JSON objects that compactly and securely transmit information between two parties.
- They are secure because they are digitally signed using a secret or a public/private key pair.
- A JWT is made up of three components:
  - Header
  - Payload
  - Signature

### JWT Header
- A JWT header contains the **type** of the token we’re creating and the **signing algorithm** that will be used.
  - Type: The type of this token will always be *“JWT”*.
  - Algorithm: The signing, or hashing, algorithm used might vary.
    - Some commonly used algorithms are HMAC-SHA256, represented by *"HS256"*,
    - RSA with SHA-256, represented by *"RW256"*,
    - and ECDSA with SHA-256, represented by *"ES256"*.
```
{
  'alg': 'HS256',  
  'typ': 'JWT'
}
```

### JWT Payload
- A JWT payload contains claims about an entity. A claim is a statement or piece of information and the entity is often a user.
  - Registered Claims: These are predefined claim types that anyone can use in a JWT.
  - Public Claims: These are custom claim types that are created by a developer and can be used publicly. They should be registered to avoid collisions, also known as repeated claims.
  - Private Claims: These are custom claim types that are not registered or public. They are only used between parties that have agreed to use them.
```
//Registered Claims
{
 'sub': '1234567890',
 'name': 'Harine Cooper',
 'admin': false,
 'iat': 1620924478,
 'exp': 1620939187
}
```

### JWT Signature
- A JWT signature is used to verify that the JWT wasn’t tampered with or changed.
- It can be created taking the encoded header, the encoded payload, a secret, and using the hashing algorithm to create a hash from those elements.
- The secret is a symmetric key known by the sender and receiver of this token.

```node
//header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//payload
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ
//sigature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
//output
3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM
// Concatenating our encoded header, our encoded payload, and our signature, and separating each with a “.”, gives us our final token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ.3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM
```

---
## Properly Storing A JWT
1. The user logs into a website and their information is sent to the server.
2. The server creates a JWT with a secret
3. The JWT is returned to the browser
4. The user makes another request, and the browser sends the JWT back to the server in the Authorization header using the Bearer schema.

With our newly created JWT, this would look like:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ.3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM
```

1. The server verifies the JWT signature and gets user information from the JWT.
2. The server will send a response back to the browser. If the JWT is valid, the browser will receive what it requested, if the JWT was not valid, the browser will likely receive an error message.

- Do not store your JWT in localStorage nor cookie as an attacker could use Cross-Site Scripting attacks to steal local data.

---
## Why Use JWTs?
JWTs are used for:
- Authorization: They’re often used for SSO.
- Information Exchange: If a server received a valid JWT, it knows the sender is who they say they are and the information hasn’t been tampered with.

So, why use JWTs?
- Parsing JSON is easier than some alternatives like XML or SAML.
- JWTs are small, scale well, and are easier for mobile devices to process.

Why are some reasons we might not want to a JWT?
- A mix of a public and private key-pair adds security, but can also add complexity.
- Sensitive information, like passwords or Social Security Numbers, should not be stored client-side, even if it is encoded.
