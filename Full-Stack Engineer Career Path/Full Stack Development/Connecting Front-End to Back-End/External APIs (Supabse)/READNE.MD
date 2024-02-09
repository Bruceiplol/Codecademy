## Server-Side API Calls to External APIs
- [supabase](https://supabase.com/)
- we will build on top of the RESTful Restaurants project to connect the application to an external API to persist the data.
- we will be creating PostgreSQL tables in supabase and modifying backend/provider/supabase.js to connect to your supabase database. The variables that we create in supbase.js will be exported to use supabase providers, allowing us to authenticate with the external API and make calls to supabase.

### Creating a Supabase Database
1. navigate to supabase and create an account by selecting the “Start your project” button. (log in with your GitHub)
2. Click on the “New project” button, then click on “New organization”.
3. create your organization, project name and database password. Select the region of your choice, then click on the “Create new project” button. (pw: Restaurant-example123)
4. on the API page— we will need two things from here: the API URL in the Config section and the public key in the Project API keys section
5. Next, we will set up the tables we will use for this tutorial.
6. Click on “New table”. We will start by creating a table called "restaurants"
7. Click on the “Import data via spreadsheet” button in the Columns section. Click on the “Paste Text” option, click “Save”
```
id,name
0b65fe74-03a9-4b37-ab09-1c8d23189273,Taco Express
869c848c-7a58-4ed6-ab88-72ee2e8e677c,Pho Vinason
213ca4a4-97ce-4783-917b-f94ef8315778,Rondo Japanese
2334b925-802e-4161-b5dd-de53315c9325,SpiceBox Indian Food
3e075c8e-7489-4fb6-b029-43a0a1b8936c,Dick's Burgers
e8036613-4b72-46f6-ab5e-edd2fc7c4fe4,Fremont Bowl Sushi
7f4a4fe2-58eb-4833-9e93-2dfdd1a1d91f,Cafe Turko
```
8. Make some adjustments to the fields for the id column. Set its Type as uuid and Primary key, and Default Value as gen_random_uuid(), which will automatically generate UUIDs for our table entries.
9. Let’s create another table for our starred restaurants. Click on the “New table” button again and name the table as starred_restaurants. (Follow the steps above again)
```
id,restaurantId,comment
a7272cd9-26fb-44b5-8d53-9781f55175a1,869c848c-7a58-4ed6-ab88-72ee2e8e677c,Best pho in NYC
8df59b21-2152-4f9b-9200-95c19aa88226,e8036613-4b72-46f6-ab5e-edd2fc7c4fe4,Their lunch special is the best
```
10. Next, we will add a foreign key to our restaurantId column. In our case, we will set the restaurantId column to reference our restaurants table’s id column. We will also click on “No Action” and choose the “Cascade” option from the dropdown, this will help keep both our tables in sync. From it's gear icon, check "Is Unique". Finally, click “Save”.

### Creating an .env file
1. In the root of starting-code/backend create a file named .env. A .env file is where we put API keys and other sensitive information.
```
//.env
SUPABASE_URL = insert supabase URL 
SUPABASE_SECRET = insert supabase key 
```
2. add .env to our starting-code/backend/.gitignore file.
```
# dotenv environment variables file
.env
```

### Connecting to Supabase
1. At the top of backend/provider/supabase.js, we need to import the dotenv package and call the .config() method. This will read the .env file and set the variables in the process.env object, this allows us to access the environment variables in our code.
```
//backend/provider/supabase.js
require("dotenv").config();
```
2. To initialize supabase, use object abstraction to target createClient and set the value of the variable to the @supabase/supabase-js package.
```
const { createClient } = require("@supabase/supabase-js");
```
3. Below the initialization of the supabase client, we will store the SUPABASE_URL and SUPABASE_SECRET environment variables as const variables.
```
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecret = process.env.SUPABASE_SECRET;
```
4. After we have used our environment variables, we are going to execute the createClient function and pass in the supabaseUrl and supabaseSecret variables as arguments.
```
const supabase = createClient(supabaseUrl, supabaseSecret);
```
5. At the bottom of the file, we are going to export the supabase variable so it can be used in backend/routes/restaurants.js and backend/routes/starredRestaurants.js.
```
module.exports = supabase;
```
