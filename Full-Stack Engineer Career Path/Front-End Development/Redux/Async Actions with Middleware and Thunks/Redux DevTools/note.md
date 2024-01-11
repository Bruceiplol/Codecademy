## Redux DevTools
### Oultine
- install Redux DevTools
- Generate React/Redux app
- Open Redux DevTools in Browswer
- Explore Features
  - State, Action, Dispatch, Diff, Inspector, Slider, Persist, Trace, Test

---
### Install
google add extension for Redux DevTools (similar to React Developer Tools)

---
### Generate App
npx create-react-app my-app --template redux (--use-npm <-- only add this code if you had yarn installed)

---
### Using Redux DevTools

1. npm start app
2. right click -> inspect -> opened up Chrome DevTool
3. arrows -> Redux

---
### Features
#### State
- Tree: summary of the slices of state
- Chart: graphical representation of the state
- Raw: plain text JavaScript object
<br>
all three give us the same information
<br>

#### Action, Dispatch, Diff
- Action tab: inspect the individual action type and any data it's carrying along to the reducers
- Diff: too see how the action changed the state

#### Inspector, Slider
- Inspector: log and display the real-time actions performed by the user
- Slider: provides a way to chronologically step through the action history

#### Persist, Trace, Test
- Persist: after clicking the tab, we won't lose our aciton history after refreshing the browser
- Trace: useful for debug, provide Stack trace information on an action creator
- Test: pre-provided testing frameworks templates
