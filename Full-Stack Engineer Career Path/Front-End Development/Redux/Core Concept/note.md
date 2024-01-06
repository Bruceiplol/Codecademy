## Redux library:
Redux is a **state management** library that follows a pattern known as the Flux architecture. <br>
In Flux and Redux, shared information is consolidated within a single object instead of being scattered across individual components.<br>
“The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur. Redux guides you towards writing code that is predictable and testable, which helps give you confidence that your application will work as expected.”

---
### One-Way Data Flow
**State** – the current data used in the app<br>
**View** – the user interface displayed to users<br>
**Actions** – events that a user can take to change the state<br>

---
### State
State in a web application represents the **current information** that drives the application’s behavior and appearance. It acts as a centralized source of data, storing the essential details of the application at any given moment.<br>
With Redux, the state can be any JavaScript type, including number, string, boolean, array, and object.<br>

``` js
const state = ['Take Five', 'Clair de Lune', 'Respect']
```

---
### Action
Actions describe an event or an action that has occurred and **provide information about what needs to be updated in the application’s state**.<br>
In Redux, actions are represented as plain JS objects.<br>
Every action must have a **type property with a string value**. This describes the action.<br>
Typically, an action has a payload property with an object value. This includes any information related to the action. In this case, the payload is the to-do text.<br>
When an action is generated and notifies other parts of the application, we say that the action is dispatched.<br>
```js
const addNewSong = {
  type: 'songs/addSong',
  payload: 'Halo'
}

const removeSong = {
  type: 'songs/removeSong',
  payload: 'Take Five'
}

const removeAll = {
  type: 'songs/removeAll'
}
```

---
### Reducers
A reducer, or reducer function, is a plain JavaScript function that defines how the current state and an action are used in combination to **create the new state**.
- It’s a plain JavaScript function
- It defines the application’s next state given a current state and a specific action
- It returns a default initial state if no action is provided
- It returns the current state if the action is not recognized

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'songs/addSong': {
      return [...state, action.payload]
    }
    case 'songs/removeSong': {
      return state.filter(song => song !== action.payload);
    }
    default: {
      return state;
    }
  }
}
```

#### Rules:
- They should only calculate the **new state value** based on the state and action arguments.
- Immutable Updates: They are **not allowed to modify the existing state**. Instead, they must copy the existing state and make changes to the copied values. 
- Pure Functions: They must not do any asynchronous logic or have other “side effects”. (it can only return a value and a pure function’s output is purely determined by its inputs only)
