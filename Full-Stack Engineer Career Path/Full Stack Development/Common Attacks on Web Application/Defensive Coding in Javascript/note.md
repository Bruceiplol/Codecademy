## The eval Function: Dangers and Alternatives
```js
// This user input closes the application
const user_input = "process.exit(0)";
eval(user_input);
```
- The `eval()` function in JavaScript takes a string as an argument and executes it as Javascript source code.
- The functions, setInterval(), setTimeout(), and new Function() use eval() in their implementations, and should be used with the same caution.
- We might be able to mitigate this risk with npm packages like `safe-eval` and `expression-eval`
- Strings passed to safe-eval must be an expression, not a statement. This prevents injected code from being executed.

```js
// Using safeEval will throw an error
const user_input = "process.exit(0)";
safeEval(user_input);
```
```js
import safeEval from "safe-eval"
safeEval(user_input);
```

## The exec method: Dangers and Alternatives
```js
// allows an attacker to print out all the JavaScript files in the current directory.
user_input = "cat *.js";
exec(user_input);
```
- The `exec()` method takes a string as an argument and runs it as a shell command, enabling shell syntax within JavaScript.
- The danger is that unrestricted commands can access, modify, and delete files.
- The `execFile()` method is an alternative that works similarly to `exec()` but requires separation of the commands and its arguments. This prevents piped commands and path variable access.

```js
import { exec, execFile } from "child_process";

// Spawns a shell with the input as is
exec("ls -lah /tmp");

// Requires a command and specified arguments to execute
execFile("ls", ["-lah", "/tmp"]);
```

## Dangers and Secure Use of the fs Module
- The file system, or fs, module in Node.js enables file system operations. It gives us access to methods like:
  - chmod() to change file permissions
  - mkdir() to create directories
  - rmdir() to delete directories
  - And many more

- we can tweak our code to restrict traversal scope to a directory of our choice
- We use the join() method of the path variable to combine our desired directory with the user-provided file name. 
```js
// risk: unlink() to delete the file defined by the user’s input.
const user_input = "./example.txt";
fs.unlinkSync(user_input);

// =>
const user_input = "example.txt"
const root_directory = process.cwd();   // Hard-code path to restrict scope
const filePath = path.join(root_directory , fileName);
fs.unlinkSync(filePath);
```

## Dangers and Secure Use of Regular Expressions
- Regular Expressions are used in almost every single programming language to validate whether user input adheres to an expected condition.
- Attackers can make use of insecure regex expressions to trigger a Regular expression Denial of Service (ReDoS).
- we can use the validator npm package. It provides a library of string validators and sanitizers for things like IP addresses, emails, and phone numbers.
- we can use tools like the safe-regex npm package to detect dangerous regular expressions.

## Secure Your Code: Strict Mode
- To invoke strict mode, simply put "use strict"; in single or double quotes on top of your JavaScript file.

```js
// Runs fine without strict mode
x = "codecademy";

// Throws “ReferenceError” with strict mode
"use strict";
x = "codecademy";

// Runs fine with strict mode if the variable is declared with let, var, or const
"use strict";
var x = "codecademy";
```

## Secure Your Code: Static Code Analysis
- Static Code Analysis evaluates a code without executing it.
- A lint, or linter, is a static code analysis tool used to improve source code by finding and flagging programming errors, bugs, and patterns that may compromise security.
- Some of the most popular JavaScript linters are:
  - ESLint
  - JSLint
  - JSHint
- We can customize the linter rules to fit our needs using configuration files or third-party plugins.
- eslint-plugin-security is a plugin that adds rules to detect several security vulnerabilities including all of the aforementioned security risks in this lesson.

- run `eslint .` on terminal to analyze the code and find any potential issues.

Run `eslint --fix .` to automatically fix most of the issues found.
