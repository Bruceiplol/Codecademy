- .addEventListener() method: DOM element listen for a specific event and execute a block of code when the event is detected.
  - two arguements: event type (click, wheel...) and an event handler function.
  - can be used to add multiple event handler functions to a single event.
  - eg. document.addEventListener('click', {function});

- second method: .on___ = {function}  
  - eg. eventTarget.onclick = eventHandlerFunction;


- .removeEventListener() method: stops specific event handlers from “listening” for specific events firing.
  - eg. eventTarget.removeEventListener('click', eventHandlerFunction);

Event Object Properties

eg.  function eventHandlerFunction(event){console.log(event.timeStamp);}
 
eventTarget.addEventListener('click', eventHandlerFunction);
- .target
- .type
- .timeStamp

Mouse Events
- mousedown: event is fired when the user presses a mouse button down.
- mouseup: event is fired when the user releases the mouse button. 
- mouseover: event is fired when the mouse enters the content of an element.
- mouseout: event is fired when the mouse leaves an element.

Keyboard Events
- keydown event: is fired while a user presses a key down.
- keyup event: is fired while a user releases a key.
- keypress: event is fired when a user presses a key down and releases it. 
