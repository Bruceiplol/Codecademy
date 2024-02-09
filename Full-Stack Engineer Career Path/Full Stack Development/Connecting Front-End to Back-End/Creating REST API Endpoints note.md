## Create REST API endpoints to connect the React front-end to a Node.js back-end.
The starting-code folder contains the following sub-folders:
- frontend
- backend
```
// in both sub-folders separately
npm install
```
```
//have two separate terminal (backend -> frontend)
npm run start

// Would you like to run the app on another port instead? › (Y/n)
y
```
 **nodemon** for the backend server and **react-scripts** for the frontend server.

 ## Getting Started
- We will create functions in "frontend/src/api/books.js" that will be used to interact with the back-end API using the CRUD pattern.
- Each function will be exported to be imported and executed in the front-end of the application.
- The purpose of exporting our functions is to ensure that we follow the DRY (Don’t Repeat Yourself) principle.
<br>
Starting-code folder:
- frontend/src/components/Book.js
functions to update and delete a book. It also contains JSX code that will render the <Book> component.
- frontend/src/components/Booklist.js
functions to get the list of books and add a new book. It also contains JSX code that will render the <BookSchedule> component.
- backend/routes/Books.js
defines the API endpoints to do the CRUD operations.

### Creating Books
```
//frontend/src/api/books.js
import {API_ENDPOINT} from "./index.js";
```

```
//create a function that adds a new book to the list of books.
//the body of our POST request matches the formatting of the ALL_BOOKS array in backend/routes/Books.js.
export const addNewBook = async (newTitle, newStart, newEnd) => {
  const response = await fetch(`${API_ENDPOINT}/books`, {
    method: "POST",
    body: JSON.stringify({
      title: newTitle,
      start: newStart,
      end: newEnd
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newBook = await response.json();
  return newBook;
};
```

### Reading Books
```
//frontend/src/api/books.js
export const getBooks = async () => {
  const response = await fetch(`${API_ENDPOINT}/books`);
  const books = await response.json();

  return books;
};
```

### Updating Books
```
//frontend/src/api/books.js
export const updateBook = async (id, newTitle, newStart, newEnd) => {
  const response = await fetch(`${API_ENDPOINT}/books/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      newTitle,
      newStart,
      newEnd
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.status;
};
```

### Deleting Books
```
//frontend/src/api/books.js
export const deleteBook = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/books/${id}`, {
    method: "DELETE",
  });

  return response.status;
};
```
