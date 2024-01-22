# Hashing vs. Encryption vs. Encoding vs. Obfuscation
## Encryption
- In cryptography, hiding data is called encryption and unhiding it is called decryption.
- When data is securely exchanged, it is first encrypted by the sender, and then decrypted by the receiver using a special key.
- There are two main types of encryption: **symmetric** and **asymmetric**.
  - Symmetric encryption uses the *same key* to both encrypt and decrypt data.
  - Asymmetric encryption uses *two different keys* to encrypt and decrypt data.

### Symmetric Encryption
- Symmetric encryption is the fastest way to encrypt data, and the most common for sending large chunks of data
- Drawbacks: if you send someone your key, then it’s in a form that any other person can read. That means your data is vulnerable to being stolen.

### Asymmetric Encryption
- you have a key pair. A key pair is made up of a public key and a private key.
  - The public key can be given to anyone and is only used to encrypt data.
  - The private key is kept secret and is only used to decrypt data.
- Asymmetric encryption is the most secure way to transmit data;
- however, it is slower and more complex
- it is primarily used to exchange smaller pieces of data.

---
## Hashing
- Hashing does not encrypt data.
- hashing is a one-way process that takes a piece of data of any size and uses a mathematical function to represent that data with a unique hash value of a fixed size.
- Because each hash should be unique, hashing allows us to see if changes have been made to documents.
- Ideally, hash functions always generate unique values for different inputs. When they don’t it’s called a hash collision.

### Using Hashes to Protect Data
- Hashes are widely used in order to store passwords in online databases.
- Remember, an attacker has no way of decrypting a hash value to get the original value. Hashing is a one-way process.

--- 
## Encoding
- Encoding transforms data into a form that can be used by a different type of system.
- Some different types of encoding are:
  - ASCII (American Standard Code for Information Interchange)
  - Unicode
  - Base64
- ASCII is a character encoding standard that is used to translate human text into something a computer can understand and vice versa.

---
## Obfuscation
- Obfuscation is less about data security and more about securing code.
- Obfuscate means to hide the meaning of something by making it difficult to understand.
- Developers might want to hide trade secrets or intellectual property from others who can access their code.
- Obfuscation can also make it harder for users to hack software or get around licensing requirements needed to use programs.
