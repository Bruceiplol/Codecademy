## Authentication
- Authentication is the verification of *who you are*.
- the security guard asks to see your ticket and ID in order to verify that the name on your ID matches the name on your ticket.
- Authentication relies on one or more factors to verify identity, and these factors come in three main types:
  - **Knowledge** is something you know, like a **username and password**.
  - **Possession** is something you have, like a **security card or mobile device**
  - **Inherence** is something you are, which generally refers to **biometric data** such as fingerprints.
-
- - Authentication that relies on a **single factor**, such as a simple username/password combo, is called Single-Factor Authentication, and is becoming increasingly insecure.
- - Authentication that requires **multiple factors**, such as a username/password combo and a code sent to a mobile device, is known as Multi-Factor Authentication.
  - This is distinct from **Multi-Step authentication**, which requires multiple types of authentication within a single factor, such as a password and a PIN.

## Authorization
 -  Authorization is the verification of *what you are allowed to do*.
 -  once the security guard has authenticated you, you then give your ticket to a different security guard who then only allows you to pass into General Admissions (instead of the VIP section).
 -  it is responsible for everything from preventing users from modifying each other’s accounts, to protecting back-end assets from attackers, to granting limited access to external services.
 -  Good authorization will allow you to limit users and services to the privileges they require;

## Encryption
- Encryption is the process of *transforming data* into a format that is unreadable unless you have the correct key to decrypt it.
- **Symmetric encryption** uses the same key to encrypt and decrypt data.
- **Asymmetric encryption** uses separate keys for encryption and decryption

---
### Evolution of Authentication
- you need to be sure you’re actually interacting with the real website, and not a malicious fake.
- Public-Key Infrastructure, or PKI, solves this problem. PKI is a system that designates trusted authorities who verify that you’re interacting with who you think you are.
- You’re making use of PKI right now to connect to this website; HTTPS relies on PKI to make it harder for malicious actors to create fake copies of websites.
- The most recent advancement in authentication is Single Sign-On, also known as SSO -- OAuth 2.0. If you’ve ever used the ‘Sign in with Google/Facebook/Etc’ buttons on websites, you’ve used SSO.
