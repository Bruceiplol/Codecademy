# Set up and Started with Render
- In recent years, cloud-based deployment solutions have become a popular option for helping developers quickly deploy applications without requiring extensive infrastructure or technical expertise.

### Platform as a Service (PaaS)
- One of the popular types of cloud-based deployment solution
- A PaaS is an all-in-one platform for building, deploying, and managing applications over the internet.
- A PaaS often uses a set of assumptions about the things most software teams need as a way of simplifying the complex task of setting up infrastructure.
- Most PaaS providers offer an easy-to-use user interface that lets developers tweak the setup to meet their application’s needs.
- The PaaS provider handles the building and running of the developer’s code
- Some PaaS providers offer additional resources, such as databases, for the developer to integrate and use within the project
- The PaaS provider handles the regular upgrades and maintenance of the infrastructure components
- The PaaS provider may handle some security aspects of the infrastructure
- The PaaS provider may provide options for easily scaling resources, either manually or automatically, to accommodate a growing number of users that are using the application

## Render
- Render is a popular PaaS product that handles the building and deployment of code and provides the resources necessary to host various applications and services.
- By using Render for deployment, we can quickly deploy a running prototype of an application to potential users.
- Render also offers other features such as managed databases, static site hosting, and integration with popular developer tools like GitHub and Slack.
- For example, all of our code of full-stack E-commerce app is hosted within a GitHub repository. we will need to connect Render to the GitHub repository
  - but it does not automatically handle hosting and connecting our PSQL database server.
  -  Fortunately, Render provides a cloud-hosted PSQL database service that can be used with our application. We can create a cloud database and have several options for accessing the database from an application’s server-side code.
  -  Render also provides steps for taking a backup of existing database data and importing it into the newly created, Render-hosted database so that data can be easily transferred.
- Any application that is deployed via Render is provided a free publicly available URL link that resembles <your-web-service-name>.onrender.com.

### Getting Started with Render
- navigate to the [Render](https://dashboard.render.com/register)
- “Web Services“: allows us to deploy web applications using multiple frameworks and languages. Render even provides quick templates for different frameworks to get an application running quickly.
-  PostgreSQL service: lets us set up a cloud PSQL database that is managed by Render.

|Render Service |	Free Instance Limitations|
|------|------|
|Web Services (e.g., Express.js)| - Service is spun down after 15 minutes of inactivity|
|                               | - Cannot scale manually or automatically|
|                               | - Slower builds|
|PostgreSQL database|	- Database expires 90 days after creation|
|                   | - Only one free database active at a time|
|                   | - Limit to 1GB of storage|
|                   | - Limit to 256MB of RAM|
|                   | - Not backed up|

### Deployment with Render
1. navigate to the Render dashboard -> click the blue, “New +” button  from the top right corner
2. select “Build and deploy from a Git repository”:
3. select specific repositories we want to deploy as a web service.
4. Select the “Connect” button to give Render permission

#### Configuring and Deploying the Web Service
- Notice that Render has automatically detected the type of code we are using in our application to determine the environment needed for deployment.
- After configuring settings, click “Create Web Service” button. to start building and deploying your application.

---
### Creating a PostgreSQL Database with Render
1. navigate to the Render dashboard -> click the blue, “New +” button  from the top right corner
2. Ensuring that the PostgreSQL database and any deployed web services exist in the same region allows our web services to be able to seamlessly communicate with the database via the provided internal database URL.
3. Click the blue “Create Database” button at the bottom of the page.'

- A section called Connections that will detail how we can connect to our database. Once our database is ready, we can see that our database has a hostname and port number. We can also see the username we set earlier and that our username now has a generated password that can be viewed. These credentials can be used to log in to the database locally via a terminal.
-  internal database URL, which can only be used if the deployed application and database are located in the same region. Make note of this internal URL as we will need it later to access the database from our source code.
-   The external database URL is a full connection string that is used when we need to access our database from sources outside of Render (or from deployed applications that are not in the same region as our database).
-   Render also provides a PSQL command that can be executed on the local computer’s terminal in order to connect to the database instance.

#### Connecting to the Database
- In the “Connections” section, a value called “PSQL Command”. This command can be copied into a terminal window in order to connect to the database.
- After running this command, we will be connected to the activity_database database that we created in Render.

 ```
PGPASSWORD=<password_goes_here> psql -h <hostname>.ohio-postgres.render.com -U activities_user activity_database

 ```
#### Creating a Table
```
activity_database=> CREATE TABLE my_activities (activity text);
```
- it defines a new table named my_activities, with a single column: activity, that has a data type of text.
- We can also check that the table was created by running the `\dt` command to see all tables
- we can close our database connection to keep our database secure. `\q`

#### Connecting to an Existing Database using Environment Variables
- "Web Service" -> "Environment" Tab: Key: Database_name, value: internal database URL(from the PostgreSQL “Connections”)

---
## Monitoring and Maintaining a Deployed Render Application
### Deployment Monitoring
- "Web Service" ->  We will explore the “Events” and “Metrics” tabs.
- Events: The “Events” tab displays all events and their statuses related to our deployments.
  - First deploy: The initial deployment.
  - Deploy live: This indicates that a deployment was successfully deployed to a live running state.
  - Deploy started: This is triggered when an automated or manual deployment occurs after a code commit.
  - Deploy canceled: This occurs when a deployment is canceled before it has been completed.
  - Deploy failed: If a deployment fails, this event will be shown. Some things that may cause a deployment to fail may be missing dependencies or errors in the application code.
  - Another useful feature of the “Events” tab is that we can re-deploy a previously successful deployment by clicking “Rollback to this deploy” next to the deployment event that we want to rollback to. (when if we find our current deployment has a bug or broken functionality)
- Metrics: The “Metrics” tab is helpful for tracking data about our application, like “Usage” and “Bandwidth” metrics.  
  - The “Usage” graph is specific to those Render services running with the “Free” plan and will show how many hours our application has been running.
  - The “Bandwidth” graph will show the total amount of data that our application is sending.

  ### Deployment Maintenance
  - visit the “Settings” menu option. Here, we can modify any of the previously set configuration fields.
  - Health Check Path: Render will periodically call this endpoint as a means to monitor the health of your application, which helps prevent application downtime.
  - Using the “Auto Deploy” feature allows us to be able to see our new code changes and features quicker since the changes are deployed immediately upon being committed.
