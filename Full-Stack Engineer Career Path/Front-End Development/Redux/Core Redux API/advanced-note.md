### Slices
The top-level state properties are known as slices. <br>
Each slice typically represents a different feature of the entire application. <br>
A slice can be any data value.<br>
<br>
an initialState that allows the programmer to do two key things:

- Plan out the general structure of the state
- Provide an initial state value to the reducer function
<br>
Example:

```js
const initialState = {
  allRecipes: [],
  favoriteRecipes: [],
  searchTerm: ""
}
```

---
### Actions and Payloads
Individual actions typically only change one slice at a time. <br>
Each action’s type follows the pattern **'sliceName/actionDescriptor'**, to clarify which slice of state should be updated.<br>
<br>
Example: 'todos/addTodo' <br>
<br>
payload — additional data passed to the reducer in order to carry out the desired change-of-state. 

---
### Immutable Updates
it must make a copy and return the copy rather than directly mutating the incoming state.<br>
When the state is a mutable data type, like an array or object, this is typically done using the spread operator (...).

---
### Reducer Composition
Individual slice reducers are responsible for updating only one slice of the application’s state, and their results are recombined by a rootReducer to form a single state object.<br>
<br>
In the reducer composition pattern, when an action is dispatched to the store:
- The rootReducer calls each slice reducer, regardless of the action.type, with the incoming action and the appropriate slice of the state as arguments.
- The slice reducers each determine if they need to update their slice of state, or simply return their slice of state unchanged.
- The rootReducer reassembles the updated slice values in a new state object.

Example:

```js
// Handles only `state.todos`.
const initialTodos = [
  { id: 0, text: 'learn redux', completed: false },
  { id: 1, text: 'build a redux app', completed: true },
  { id: 2, text: 'do a dance', completed: false },
];
const todosReducer = (todos = initialTodos, action) => {
  switch (action.type) {
    case 'todos/addTodo': 
      return [...todos, action.payload]
    case 'todos/toggleTodo':
      return todos.map(todo => {
        return (todo.id === action.payload.id) ? 
          { ...todo, completed: !todo.completed } : 
          {...todo};
      });
    default:
      return todos;
  }
};

// Handles only `state.filter`
const initialFilter = 'SHOW_INCOMPLETE',
const filterReducer = (filter = initialFilter, action) => {
  switch (action.type) {
    case 'filter/setFilter':
      return action.payload;
    default:
      return filter;
};

const rootReducer = (state = {}, action) => {
  const nextState = {
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action)
  };
  return nextState;
};

const store = createStore(rootReducer);
```

---
### combineReducers
Refactor 1:

```js
import { createStore } from 'redux';

// todosReducer and filterReducer omitted

const rootReducer = (state = {}, action) => {
  const nextState = {
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action)
  };
  return nextState;
};

const store = createStore(rootReducer);
```

Refactor 2:

```js
import { createStore, combineReducers } from 'redux'

// todosReducer and filterReducer omitted.

const reducers = {
    todos: todosReducer,
    filter: filterReducer
};
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);
```

---
### A File Structure for Redux

```
src/
|-- index.js
|-- app/
    |-- App.js 
    |-- store.js
|-- components/
    |-- FavoriteButton.js 
    |-- Recipe.js 
|-- features/
    |-- allRecipes/
        |-- AllRecipes.js 
        |-- allRecipesSlice.js
    |-- favoriteRecipes/
        |-- FavoriteRecipes.js 
        |-- favoriteRecipesSlice.js
    |-- searchTerm/
        |-- SearchTerm.js 
        |-- searchTermSlice.js
```

Index.js:

```js
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';
// Import 'store' here.
import {store} from './app/store'
const root = createRoot(document.getElementById('root'));
const render = () => {
  // Pass `state` and `dispatch` props to <App />
  root.render(
    <App 
      state={store.getState()}
      dispatch = {store.dispatch}
    />,
  )
}
render();
// Subscribe render to changes to the `store`
store.subscribe(render)
```

---
### Using Store Data Within Feature Components
- Import the React feature-components into the top-level App.js file.-
- Render each feature-component and pass along the slice of state and the dispatch method as props.
- Within each feature-component:
  - Extract the slice of state and dispatch from props.
  - Render the component using data from the slice of state.
  - Import any action creators from the associated slice file.
  - Dispatch actions in response to user inputs within the component.
