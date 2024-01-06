### Create Store:
It holds the current state inside, receives action dispatches, executes the reducer to get the next state, and provides access to the current state for the UI to re-render.

```js
import {createStore} from 'redux'
const store = createStore(Reducer);
```

---
### Dispatch Actions to the Store
Each time store.dispatch() is called with an action object, the store’s reducer function will be executed with the same action object.

```js
const action = { type: 'actionDescriptor' }; 
store.dispatch(action);

console.log(store.getState()); // returns the current value of the store’s state.
```

---
### Respond to State Changes
actions dispatched to the store can be listened for and responded to using the store.subscribe() method. <br>
Sometimes it is useful to stop the listener from responding to changes to the store, so store.subscribe() returns an unsubscribe function.

```js
const reactToChange = () => console.log('change detected!');
store.subscribe(reactToChange);

const unsubscribe = store.subscribe(reactToChange);
```

---
### Connect to UI
Connecting a Redux store with any UI requires a few consistent steps, regardless of how the UI is implemented:

- Create a Redux store
- Render the initial state of the application.
- Subscribe to updates. Inside the subscription callback:
- Get the current store state
  - Select the data needed by this piece of UI
  - Update the UI with the data
- Respond to UI events by dispatching Redux actions
