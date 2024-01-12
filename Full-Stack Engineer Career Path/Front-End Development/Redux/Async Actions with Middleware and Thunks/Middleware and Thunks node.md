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
