1. ```import React from 'react';``` <br/>
  This creates an object named React, which contains methods necessary to use the React library. With the object, we can start utilizing features of the react library! <br/>
<br/>

2. ```import ReactDOM from 'react-dom/client';``` <br/>
  The methods imported from 'react' do not deal with the DOM at all. They don’t engage directly with anything that isn’t part of React. <br/>
  Methods imported from 'react' are only for pure React purposes, such as creating components or writing JSX elements. <br/>
<br/>

3. ```Create a Function Component``` <br/>
  It’s useful to think of components as smaller pieces of our interface. Combined, they are the building blocks that make up a React application.  <br/>
  e.g. In a website, a component for the search bar, another component for the navigation bar, and another component for the dashboard content itself. <br/>
  Function component names must start with capitalization and are conventionally created with PascalCase! Due to how JSX tags are compiled, capitalization indicates that it is a React component rather than an HTML tag. <br/>
```javascript
function MyComponent() {
    return <h1>Hello world</h1>;
  }
```
<br/>

5. The Return Keyword in Functional Components <br/>
  when we define functional components, we must return a JSX element. <br/>
<br/>

6. Importing and Exporting React Components <br/>
  App.js file is the top level of your application, and index.js is the entry point. <br/>
  we’ve defined the component inside of App.js, but because index.js is the entry point, we have to export it to index.js to render. <br/>
  ```export default MyComponent;``` <br/>
  ```import MyComponent from './App';``` <br/>
<br/>

7. Using and Rendering a Component <br/>
  We can use it with an HTML-like syntax that resembles a self-closing tag: <br/>
  => ```<MyComponent />```<br/>
  ```ReactDOM.createRoot(document.getElementById('app')).render(<MyComponent />);```
