## Designing an API using OAS 3.0
- The OpenAPI Specification (OAS) is one of the most popular standards for designing human-readable API contracts.
- The OAS specifies the rules and syntax required to describe an API’s interface.

![Structure](https://static-assets.codecademy.com/Courses/Swagger-OpenAPI/openapi3structure.png)

### Info & OpenAPI
- The info and openapi section of the API contract contains essential metadata.
- Essentially, the info object should give an API’s end-users and internal developers a high-level overview of what the API does.

```yaml
openapi: 3.0.0
info:
  title: Simple Pet Store
  version: 1.0.0
  description: This is a sample server for a pet store.
  termsOfService: http://example.com/terms/
  contact:
    name: API Blogger
    email: support@example.com
    url: http://example.com/support
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
```

### Servers
- The servers object can give a client information on where the API’s servers are located through its URL.
- OAS 3.0 supports multiple servers.

```yaml
servers:
- url: https://development.gigantic-server.com/v1
  description: Development server
- url: https://staging.gigantic-server.com/v1
  description: Staging server
- url: https://api.gigantic-server.com/v1
  description: Production server
```

### Paths
- An OAS contract’s paths object shows the various endpoints an API exposes and the corresponding HTTP methods.
- It’s also under each method that the actual request-response cycle is detailed.
- This section gives all parties a clear sense of the data the API will expose and helps with planning, documenting, and implementing the API.
- Parameters: Parameters are the variable parts of a request. There are four types of parameters that can be specified using the OAS 3.0:
  - path parameters, such as /users/{id}
  - query parameters, such as /users?role=admin
  - header parameters, such as X-MyHeader: Value
  - cookie parameters, which are passed in the Cookie header, such as Cookie: debug=0; csrftoken=BUSe35dohU3O1MZvDCU

```yaml
paths:
  /pet/{petId}:
    get:
      summary: Find pet by ID
      description: Returns a single pet
      parameters:
      - name: petId
        in: path
        description: ID of pet to return
        required: true
        schema:
          type: integer
          format: int64
      responses:
        200:
          description: successful operation
        400:
          description: Invalid ID supplied
          content: {}
        404:
          description: Pet not found
          content: {}
```

### External Docs
- OAS 3.0 allows an API to reference external documentation via the external documentation object.

```yaml
description: Find more info here
url: https://example.com
```

### Tags
- Tags are friendly categories to group various API operations.
- These tags can also be handled by other third-party tools which integrate or read the OAS.
- Tags can automatically be added to every path operation using the tags object.
- Tags can also be given descriptions by adding an optional tags section in the root level of the API definition.

```yaml
paths:
  /pet/findByStatus:
    get:
      summary: Finds pets by Status
      tags:
        - pets
  /pet:
     post:
       summary: Adds a new pet to the store
       tags:
         - pets
tags:
- name: pets
  description: Everything about your Pets
```

### Components
- The component object can hold a set of reusable objects for an APIs design.
- The reusable objects can be schemas, responses, parameters, examples, and more.

```yaml
paths:
  /pets/{petId}:
    get:
      summary: Get a pet by ID
      parameters:
        ...
      responses:
        '200':
          description: A single pet.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
  /pets:
    get:
      summary: Get all pets
      responses:
        '200':
          description: A list of pets.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```
