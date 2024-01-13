## Middleware
- In Redux, middleware runs between when an action is dispatched and when that action is passed along to the reducer.
- Some common tasks that middleware performs include logging, caching, adding auth tokens to request headers, crash reporting, routing, and making asynchronous requests for data.
- To make asynchronous requests, we’re using a Redux Toolkit utility function called createAsyncThunk() and the extraReducers option you can pass to the createSlice function.

```js
import { createStore, applyMiddleware } from 'redux';
import { middleware1, middleware2, middleware3 } from './exampleMiddlewares';
import { exampleReducer } from './exampleReducer';
import { initialState} from './initialState';

const store = createStore(
  exampleReducer, 
  initialState, 
  applyMiddleware(
    middleware1, 
    middleware2, 
    middleware3
  )
);
```

```js
const exampleMiddleware = storeAPI => next => action => {
  // do stuff here
  return next(action);  // pass the action on to the next middleware in the pipeline
}
```

- Each middleware has access to the storeAPI (which consists of the dispatch and getState functions), 
- as well as the next middleware in the pipeline, 
- and the action that is to be dispatched. 

---
## Thunk
 - A thunk is a higher-order function that wraps the computation we want to perform later.

Example:

```js
const add = (x,y) => {
  return () => {
    return x + y; 
  } 
}
const delayedAddition = add(2,2)
delayedAddition() // => 4
```

- Note that calling add() does not cause the addition to happen – it merely returns a function that will perform the addition when called. To perform the addition, we must call delayedAddition().

### Promise Life Cycle
- pending/fulfilled/rejected
- createAsyncThunk for including promise lifecycle actions in your Redux apps

```js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUser } from './api'
const fetchUserById = createAsyncThunk(
  'users/fetchUserById', // action type
  async (arg, thunkAPI) => { // payload creator
    const response = await fetchUser(arg);
    return response.json();
  }
)
```

- The first argument, arg, will be equal to the first argument passed to the thunk action creator itself. For example, if we call fetchUserById(7), then inside the payload creator, arg will be equal to 7.
- you’ll want to bundle multiple arguments into a single object. For example, say we want to search our app’s users by first and last name. If the thunk action creator is called searchUsers, we would call it like this: searchUsers({firstName: 'Ada', lastName: 'Lovelace'}).
- If your thunk requires no arguments, you can just call the action creator without it, and the arg argument will be undefined.
- The payload creator’s second argument, thunkAPI, is an object containing several useful methods, including the store’s dispatch and getState.
<br>
If you need to access the individual pending/fulfilled/rejected action creators, you can reference them like this:
- fetchUserById.pending
- fetchUserById.fulfilled
- fetchUserById.rejected

### Using createSlice() with Async Action Creators
- extraReducers allows createSlice() to respond to action types generated elsewhere.

```js
onst usersSlice = createSlice({
  name: 'users',
  initialState: { 
    users:  [], 
    isLoading: false, 
    hasError: false 
  },
  reducers: {
    addUser: (state, action) => { 
      state.users.push(action.payload) 
    }        
  },
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.users.push(action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})
```
