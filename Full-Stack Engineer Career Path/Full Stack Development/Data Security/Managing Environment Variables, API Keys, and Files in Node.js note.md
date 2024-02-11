## Environment Variables
-  It is used to store information we want to reference in a program.
-  it’s a key-value pair whose value is set and stored outside a program, usually by the operating system or the production environment.
-  Environment variables can prevent the secret development keys and passwords from getting out.
-  more efficient coding in the long run.

```env
DB_HOST=123.45.678.90
DB_USER=root
DB_PASS=123456
API_KEY=V3rYPubl1cK3y
```

#### Environment Variables vs Config Variables
- choosing one comes down to the developer’s preference and environment.
- a config.json file allows us to have a greater variety of data types and complex data structures
- the data in a .env file is generally more intelligible.
- they both accomplish the same purpose: keeping your information secure.

### Create an Environment Variable
- We can create this file by running the command `touch .env`.
- one environment variable is written per line and follows the format: `NAME=VALUE`.
- Lines starting with `#` are treated as comments.
- Each word in an environment variable is capitalized and is separated by a non-space character. By convention, words are separated by an underscore `_`

```env
# HOST IP Address
CONTROL_PANEL_IP=123.456.7.89

# Current Admin’s Username
ADMIN_USERNAME=admin#1337

# Current Admin’s Password
ADMIN_PASSWORD=eFVwZ.9Z4Fa_JbGDXepNcnW

# Admin’s Name
ADMIN_NAME=Sonia Kaur
```

### Import Environment Variables using dotenv
- Node.js stores all the environment variables into a global variable called process.env.
- We can use a npm package called `dotenv` to load all our environment variables from `.env` to `process.env`, allowing us to access them in our program.
- `npm install dotenv`

```js
// Imports the npm package
import dotenv from "dotenv"; 
// Loads environment variables into process.env
dotenv.config(); 

// Prints “Sonia Kaur”
console.log(process.env.ADMIN_NAME); 
// Prints “admin#1337”
console.log(process.env.ADMIN_USERNAME);
```
### Use Case: Database Credentials
- Hiding database credentials is one of the most common and important use cases for environment variables.
-  keep database credentials in the .env file rather than hard-coding it. This ensures our database is not exposed on accidental pushes to a git repository and allows for quick configuration when distributing or deploying our project on a different environment.
-  the following are typically present in each database:
  -  Host IP address
  -  Port
  -  Username
  -  Password

### Use Case: API Keys
-  An API key is a unique identifier used to authenticate a user or most commonly, an application, to specific software.

```env
PROGRAM_NAME=Codecademy Weather App
ZIP_CODE=91402
WEATHER_API_KEY = Th151sb4D3x4Mp13of4n4P1K3y
```
```js
const weather_data = getWeather(process.env.ZIP_CODE, process.env.WEATHER_API_KEY);
```

### .gitignore
- In .gitignore, each line corresponds to a file, directory, or pattern we would like to ignore when staging.
- Writing `node_modules/` in .gitignore will ignore all directories with the name, node_modules, and all subdirectories and files inside them.
- The forward slash `/` is necessary to just ignore directories. Otherwise, it will ignore files named node_modules as well.
- We can also use regular expression patterns in .gitignore to ignore types of files.

```
# Windows OS file
thumbs.db

# macOS OS metafile
.DS_Store
```

### Project Collaboration
- if we are working as part of a team or we want to share our project with others without revealing the sensitive information in our environment variables?
- The best practice here is to include a sample .env file in the public repository as a template for the next person.
- This would usually be named sample.env or example.env. This file contains the names of all the environment variables we need to run a project but their values are empty.
- Writing comments to explain each variable is recommended and it helps to group related variables.
- It’s also best practice to provide instructions for obtaining someone’s own credentials or API keys in the project README.md file.

```env
# Database Information
DB_USER=
DB_PASS=

# Stocks API Key
API_KEY=
```
