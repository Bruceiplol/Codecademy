### installation
npm install @reduxjs/toolkit

---

```js
import {createSlice} from '@reduxjs/toolkit'
````

---

```js
import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../searchTerm/searchTermSlice.js';

/* Create your Slice object here. */
const options = {
  name: 'favoriteRecipes',
  initialState: [],
  reducers: {
    addRecipe: (state, action) => {
      return [...state, action.payload]
    },
    removeRecipe: (state, action) => {
      return state.filter(recipe => recipe.id !== action.payload.id)
    },
  },
}
export const favoriteRecipesSlice = createSlice(options)
/* Do not delete the code below...*/

export const selectFavoriteRecipes = (state) => state.favoriteRecipes;

export const selectFilteredFavoriteRecipes = (state) => {
  const favoriteRecipes = selectFavoriteRecipes(state);
  const searchTerm = selectSearchTerm(state);

  return favoriteRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
```

---
### Writing "Mutable" Code with Immer
You don’t need to learn the Immer library. All you do need to know is that createSlice() takes advantage of it, allowing us to safely “mutate” our state. 

```js
addRecipe: (state, action) => {
      state.push(action.payload);
    },
```

---
### Returned Objects and Auto-Generated Actions
When you apply createSlice(), it gives you back an object like this:

```js
/* Object returned by todosSlice */
{
 name: 'todos',
 reducer: (state, action) => newState,
 actions: {
   addTodo: (payload) => ({type: 'todos/addTodo', payload}),
   toggleTodo: (payload) => ({type: 'todos/toggleTodo', payload})
 },
```

=>

```js
export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer
```

---
Redux Toolkit has a configureStore() method that simplifies the store setup process.

```js
import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
 reducer: {
   // Define a top-level state field named `todos`, handled by `todosReducer`
   todos: todosReducer,
   filters: filtersReducer
 }
})

export default store
```

- Reducer: It combines todosReducer and filtersReducer into the root reducer function, which will handle a root state that looks like {todos, filters}, removing the need to call combineReducers(). This lowers the amount of boilerplate code we need to write.
- Store: It creates a Redux store using that root reducer, removing the need to call createStore()
- Middleware: It automatically adds middleware to check for common mistakes like accidentally mutating the state. In the traditional manual way, we’d need to set this up ourselves.
- DevTools: It automatically sets up the Redux DevTools Extension connection. In the traditional manual way, we’d also need to set this up ourselves.
