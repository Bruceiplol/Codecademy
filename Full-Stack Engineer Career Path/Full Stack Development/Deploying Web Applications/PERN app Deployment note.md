# Deployment
- PERN: PostgresSQL, Express, React, Node.js
- The application code, database, and assets (e.g., images) are located on a personal computer (our “machine”). How do we make our application available to users to interact with over the internet? That is where deployment comes into play!
- We can think of deployment as a set of activities that make a piece of software available for other users.

## Deployment in the Software Development Life Cycle (SDLC)
1. **Planning**: This first phase of the SDLC involves defining the problem to solve, and any objectives or requirements the software should meet are gathered.
2. **Defining/Analysis**: After developing a solid plan, information must be gathered before software engineers can create the new software. This could include defining what resources (like hardware or network) will be needed to run a prototype of the software or even research to find existing or similar software.
3. **Design**: In this phase, the technical details of the project are designed. The requirements gathered in the planning phase are transformed into concrete specifications.
4. **Development/Implementation**: The software starts to come alive within this stage as the code is built. This is when code is written to meet the specifications and goals of the software.
5. **Testing/Integration**: Testing is a crucial step in the SDLC. This step confirms that all of the software components are working seamlessly together. Any major issues or bugs are ideally caught during this stage prior to the application reaching the hands of the users.
6. **Deployment**: In this phase, a version of the software is packaged and made available so it can be used by other members of the development team (e.g., QA engineers), non-development team members (e.g., project managers), or real users. During the deployment process, the software can be tried out on different environments, like, for example, a testing environment only available to beta users (more on this later).
7. **Maintenance**: Lastly, once the software is out in the world, it is crucial to maintain it. This phase involves fixing bugs, as well as the continued development of new features. Any changes follow the same SDLC cycle of defining the problem (bug/feature), designing a solution, implementing the fix, testing, and deployment.

## Typical Deployment Process
- developers deploy code across multiple environments during the development process. An environment is the subset of infrastructure resources (e.g., computers, memory) used to execute a program under specific constraints.
- The local development environment: This is where software is first written and tested, typically on a developer’s own computer.
- The staging environment: This is where the software can be tested in a production-like environment, but before real users are involved.
- The production environment: This is where software is accessible by real users!

# Wrap-up
Deployment refers to the process of releasing software in a target environment (e.g., staging, production) so that it can be accessed and used by a set of end-users (e.g., project managers, customers). Without deployment, only development team members would be able to access the software.
