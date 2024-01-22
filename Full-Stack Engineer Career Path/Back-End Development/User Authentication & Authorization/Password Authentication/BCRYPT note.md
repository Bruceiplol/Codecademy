-  you should hash passwords before storing them in a database
-  There are plenty of cryptographic hashing functions to choose from, such as the SHA-3 or MD-5 algorithms.
-  SHA-3 and MD-5 algorithms are known to be quite fast. Unfortunately, the faster the function, the faster a hacker can retrieve a hashed password through brute-force attacks.

---
### Hash Functions
- `bcrypt` is hashing algorithm.
- A hash function only works one-way, which means that once a value is hashed it can’t be unhashed.
- Whenever the same user logs in, we hash the password they tried to log in with and compare it to the already stored hash value.

- One common way to attempt cracking hashed passwords is through the use of rainbow tables.
- Rainbow tables are large lookup databases that consist of pre-computed password-hash combinations which correlate plaintext passwords with their hashes.

- protect ourselves from rainbow table attacks by the use of salts.
- A salt is a random value that is added to the input of a hashing function in order to make each password hash unique even in the instance of two users choosing the same passwords.

---
## Using bcrypt to Hash Passwords
- Bcrypt uses a salt and salt rounds to secure a password.
- A salt is a value that is concatenated to a password before hashing in order to make it less vulnerable to rainbow table and brute-force attacks.
- A salt round can be described as the amount of time needed to calculate a single bcrypt hash. The higher the salt rounds, the more time is necessary to crack a password.

1. Generate a salt
2. Hash the password
3. Return `null` if there’s an error

```js
const bcrypt = require("bcrypt");

const passwordHash = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
  }
  return null;
};
```
1. We’ll make use of `async/await` and `try/catch` blocks to create an asynchronous function.
2. We’ll pass in a password string and salt rounds
3. The built-in `genSalt()` function automatically generates a salt for us. Since we’re using an asynchronous function we can `await` this function call
4. Then we make a call to `bcrypt.hash()` which takes in a password string and a salt.
5. We await and return this function call since it will return the hashed password.
6. In the catch block, we can print out the error with `console.log()`.
7. Lastly, we return `null` if there’s an error with `bcrypt`

---
## Verifying Passwords
The process of comparing passwords should look as follows:
1. Retrieve plain text password.
2. Hash the password.
3. Compare the hashed password with the one stored in our DB. (Since we’re using the same hash, it should return the same value if the password is correct.)

- `bcrypt` provides us with a handy function called `compare()` which takes in a plaintext password, `password` and a hashed password, `hash`:
```js
bcrypt.compare(password, hash);
```
```js
const comparePasswords = async (password, hash) => {
  try {
    const matchFound = await bcrypt.compare(password, hash);
    return matchFound;
  } catch (err) {
    console.log(err);
  }
  return false;
};
```

1. We’ll use an asynchronous function and pass in `password` and `hash` as its parameters.
2. Within our try block we can use `compare()` and compare the provided password with the stored hashed password, The return value will be true if the password provided, when hashed, matches the stored hash.
3. Outside the try/catch block we can return false in order to end the execution of the code if there were any other errors or if bcrypt did not execute correctly.
