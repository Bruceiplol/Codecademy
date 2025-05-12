1. Use Multiline JSX in a Component
  a multi-line JSX expression should always be wrapped in parentheses!
```js
function XxxYxx() {
    return ();
  };
```

3. Use a Variable Attribute in a Component
  const object = {attr1: attr2: ....}
  fucntion Func() {return(<img src={object.attr1} alt={object.attr2}/>)}

4. Putting Logic in a Function Component
  inside a component function, we can put some others logic inside, for example calculation
  function RandomNumber() {
    //First, some logic that must happen before returning
    const n = Math.floor(Math.random() * 10 + 1);
    //Next, a return statement using that logic: 
    return <h1>{n}</h1>
  }

5. Use a Conditional in a Function Component
  const fiftyFifty = Math.random() < 0.5;
  function TonightsPlan(){
    if (fiftyFifty) {return <h1>Tonight I'm going out WOOO</h1>} 
    else {return <h1>Tonight I'm going to bed WOOO</h1>}
  };

6. Event Listener and Event Handlers in a Component
  function MyComponent(){
    function handleHover() {
      alert('Stop it.  Stop hovering.');
    }
    return <div onHover={handleHover}></div>;
  }
  The handleHover() function is passed without the parentheses we would typically see when calling a function.
