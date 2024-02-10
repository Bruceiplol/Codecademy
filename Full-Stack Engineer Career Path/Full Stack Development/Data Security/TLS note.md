# Transport Layer Security (TLS)
- TLS: One of the protocols that runs the modern internet.
- Transport Layer Security (TLS) is a protocol for establishing secure connections between computers. TLS’s largest claim to fame is that it powers HTTPS, the protocol that lets us browse the web securely.
- TLS provides security for data that is sent through transport layer protocols. It does this by creating a secure connection (often conceptualized as a tunnel) through which data can be transmitted to its destination.
-  TLS makes use of other algorithms and protocols to handle things like encryption and key exchange.
-  TLS uses public-key certificates in order to make sure that servers (and sometimes clients) are who they say they are. These certificates are created using the ability of asymmetric cryptography to digitally sign data, verifying its authenticity and provenance.

#### TLS vs SSL
- Secure Sockets Layer (SSL) is the predecessor of TLS. Like TLS, it is a protocol meant to establish secure communications between computers.
- The primary difference between SSL and TLS is that SSL has a history of serious security vulnerabilities, with the final version being deprecated in 2015.
-  For the most part, whenever you hear someone talk about SSL, you can probably assume they’re actually talking about TLS.

## How TLS works
In order to create a secure connection, two things need to happen:
1. The client needs to authenticate the server.
2. The client and server need to exchange a shared secret with which to communicate.

![TLS Handshake Protocol](https://static-assets.codecademy.com/content/paths/web-security/tls/TLS-Handshake-light.svg)

### Authentication
- TLS uses public key infrastructure (PKI) to handle authentication for servers.
-  PKI is a system where a trusted 3rd party called a certificate authority verifies ownership of a server’s public key, and digitally signs the server’s SSL/TLS certificate.
