# API design
- API design is defined as the iterative collection of decisions that lead to a concrete plan for developing, implementing, and maintaining an API.
- understanding the API’s end-user, their needs, and how best the API can meet those needs.
- Benefits of detailed API design:
  - **Effective Implementation**: A detailed API design can significantly help in the APIs implementation (usually by developers) phase by preventing ambiguity.
  - **Incremental Development**: Having a straightforward design helps know precisely which resource, or sub-resources, would need to be updated (or retired), preventing confusion and leading to less duplicated work.
  - **Better Documentation**: A solid initial API design makes documenting the API faster and less error-prone.

### Characteristics of a Well-Designed API
- **Easy to read and work with**: A well-designed API will be easy to work with, and its resources and associated operations can quickly be memorized by developers who work with it regularly.
- **Hard to misuse**: Implementing and integrating with a well-designed API will be a straightforward process and less error-prone. It has informative feedback and doesn’t enforce strict guidelines on the API’s end-user.
- **Complete and concise**: A well-designed API is a complete API. This means the API exposes any data that the end-user expects it to expose. Most APIs are completed over a long period of time – implementing end-user feedback and releasing new versions along the way.
- **Well documented**: Finding any information about endpoints, integrations, and features should be simple with a well-designed API. The documentation will cover and explain all the available functionality of the API.
- **Reliable**: An API’s end-user will depend on an API to be available and functioning when they need it. They also expect functionality to not arbitrarily change without any proper notice.

## Collections, Resources, and Their URLs
#### Nouns are Your Best Friend
- the base URL should always be neat, elegant, and, most importantly, intuitive.
- it is best to keep API URLs consistent by only using nouns.

#### Describe resource functionality with HTTP methods
- RESTful APIs are comprised majorly of HTTP methods that have well-defined and unique actions for any resource.
- achieve a level of consistency in the type of operations end-users expect to occur when using an HTTP method.

## Responses
#### Give Feedback to Help Developers Succeed
- Good feedback involves positive validation on correct implementations and an informative error on incorrect implementations that can help developers debug and correct how they use the API.
- 3 possible error outcomes when using an API:
  - The client application behaved erroneously (client error - 4xx response code)
  - The API behaved erroneously (server error - 5xx response code)
  - The client and API worked (success - 2xx response code)

## Requests
#### Handle complex requests elegantly
- One way to account for specific properties and limit responses is to use a query parameter, adding a ? with key-value pairs that list out what a user needs.
- example: `GET /photos?location=boston&hashtag=winter&limit=10`
