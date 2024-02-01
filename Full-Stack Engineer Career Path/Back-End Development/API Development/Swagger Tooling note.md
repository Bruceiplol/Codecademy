# Swagger
- Swagger is the name for a set of tools that help with each step of designing, developing, testing, and visualizing an API.
- three specific open-source tools: Swagger Editor, Swagger Codegen, and Swagger UI.
- OpenAPI = Specification
- Swagger = Tools for implementing the specification

### Swagger Editor
- This tool is primarily used to design, define and document RESTful APIs.
- This editor accepts different OpenAPI versions, includes the option to convert a written specification to YAML (or JSON), and highlights any errors that might be occurring in the specification.
- The Swagger Editor can be accessed two ways:
  - Via a web browser by visiting [Swagger’s online editor](https://editor.swagger.io/).
  - Via a local machine by downloading the editor from [Swagger’s GitHub repository](https://github.com/swagger-api/swagger-editor).

### Swagger Codegen
- Using Swagger Codegen and a provided API specification, we can generate server and client-side code in many different languages. The generated code will even include documentation from the provided specification.

### Swagger UI
- The Swagger UI tool allows anyone to visualize and interact with an API’s resources without having any of the implementation logic in place.
- Swagger UI can primarily be accessed two ways:
  - Via the [Swagger’s online editor](https://editor.swagger.io/) tool. The right-hand side of the editor tool neatly displays any valid specification using Swagger UI. This means Swagger Editor already has Swagger UI built into it and generates the specification documentation live as it is created.
  - Via a local machine by downloading from the [Swagger UI GitHub repo](https://github.com/swagger-api/swagger-ui).

---
## Designing and Documenting an API with Swagger
Link: [Tutorial Link](https://www.codecademy.com/journeys/full-stack-engineer/paths/fscj-22-back-end-development/tracks/fscj-22-api-development-with-swagger-and-openapi/modules/wdcp-22-design-and-document-apis-with-openapi-swagger-b5ed0e68-16f7-478f-9bed-847803b52b3b/articles/designing-and-documenting-an-api-with-swagger)
<br><br>
### Designing the API contract using Swagger Editor
[Swagger’s online editor](https://editor.swagger.io/)

1. **Add the specification format version**: We will be using version 3.0.1, add `openapi: 3.0.1`. By adding this, we will gain access to the “Insert” tab on the top options bar of the editor.
2. **Adding Info**: Select the “Add Info” option from the “Insert” tab.
3. **Adding Paths**: Select the “Add Path Item” option in the “Insert” tab.
4. **Adding Operations**: Select the “Add Operation” option in the “Insert” tab. For each operation that we add, we will also add a tag to organize them in a meaningful way.
5. **Adding Example Responses**: Select the “Add Example Response” option in the “Insert” tab.
6. **Adding example request bodies and parameters**: We can manually add it into the Swagger Editor text box, above the responses: section. For example, POST for /neworder path
  ```yaml
  requestBody:
    description: A new order object
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Order'
  ```
  - the code we just added uses the OpenAPI schema feature. This will allow us to reuse an order component throughout the rest of our specification.
  - To complete the schema, scroll down to the bottom of the editor and add the order component:
  ```yaml
  components:
    schemas:
      Order:
        type: object
        properties:
          name:
            type: string
          id:
            type: string
          state:
            type: string
        xml:
          name: Order
  ```
  - You can also describe the parameters in a similar way. In the /update/{id} and /delete/{id} paths, add the following text below the operationId section
  - Ensure that the YAML code is indented correctly and is on the same indentation level as operationId. This will update Swagger UI to describe that the id parameter is required and that it represents the id of an order.
  ```yaml
  parameters:
    - name: id
      in: path
      description: 'The id of the order.'
      required: true
      schema:
        type: string
  ```

```
openapi: 3.0.1
info:
  title: Online Order API
  version: 1.0.0
  description: A basic API for working with the Swagger tools.
paths:
  /orders:
    summary: Get all of the order data.
    description: This path is used to retrieve order data form the orders.json file.
    get:
      summary: Gets the order data
      description: Retrieve the order information from the orders.json file.
      operationId: get_orders
      responses:
        '200':
          content:
            application/json:
              examples:
                orders:
                  value: >-
                    {"orders":[{"name":"Carey
                    Maynard","id":"001","state":"pending"},{"name":"Angelo
                    Ayala","id":"002","state":"canceled"},{"name":"Regina
                    Yates","id":"003","state":"pending"},{"name":"Elliott
                    Mcclure","id":"004","state":"pending"}]}
          description: Success
      tags:
        - Orders
  /neworder:
    summary: Add new orders
    description: This path is used to add new orders to the orders.json file.
    post:
      summary: Add a new order
      description: >-
        This operation adds a new order to the list of orders found in the
        orders.json file.
      operationId: new_order
      requestBody:
        description: A new order object
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Order'
        required: true
      responses:
        '400':
          content:
            text/plain; charset=utf-8:
              examples:
                Error:
                  value: Invalid Argument
          description: Invalid Argument Provided
        '200':
          content:
            text/plain; charset=utf-8:
              examples:
                Message:
                  value: Success
          description: Success
      tags:
        - New Order
  /update/{id}:
    summary: Update the state of an order.
    description: >-
      This path is used to update the state of an order with a matching id in
      the orders.json file.
    put:
      summary: Update the state of an order
      description: >-
        This operation updates the `state` of an order with a matching id from
        the orders.json file.
      operationId: update_order
      parameters:
        - name: id
          in: path
          description: The id of the order.
          required: true
          schema:
            type: string
      requestBody:
        description: A state string
        content:
          text/plain:
            schema:
              type: string
      responses:
        '400':
          content:
            text/plain; charset=utf-8:
              examples:
                Error:
                  value: Invalid Argument
          description: Invalid Argument Provided
        '200':
          content:
            text/plain; charset=utf-8:
              examples:
                Message:
                  value: Success
          description: Success
      tags:
        - Update Order
  /delete/{id}:
    summary: Delete an order
    description: >-
      This path is used to delete an order with a matching id from the
      orders.json file.
    delete:
      summary: Deletes an order
      description: >-
        This operation deletes an order with a matching id from the orders.json
        file
      operationId: delete_order
      parameters:
        - name: id
          in: path
          description: The id of the order.
          required: true
          schema:
            type: string
      responses:
        '400':
          content:
            text/plain; charset=utf-8:
              examples:
                Error:
                  value: Invalid Argument
          description: Invalid Argument Provided
        '200':
          content:
            text/plain; charset=utf-8:
              examples:
                Message:
                  value: Success
          description: Success
        
      tags:
        - Delete Order
components:
  schemas:
    Order:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
        state:
          type: string
      xml:
        name: Order
```

---
## Writing the Code
- We could use Swagger Codegen to generate code
- select the “Generate Server” tab and the “nodejs-server” option.
- In Swagger UI, select the target path and take a look at the info from the specification.

---
## Testing the API
- npm start
- To test the /orders path, we can simply navigate to http://localhost:3000/orders in a browser. The data should appear on the screen.
- Next, to test our /neworder path, we can use the curl command in a terminal.
  - navigate to the project directory
  - `curl --header "Content-Type: application/json" -d "@new_order.json" http://localhost:3000/neworder`
- Updating an Existing Order
  - `curl -X PUT -d complete http://localhost:3000/update/001`
- Deleting an Existing Order
  - `curl -X DELETE http://localhost:3000/delete/002`
