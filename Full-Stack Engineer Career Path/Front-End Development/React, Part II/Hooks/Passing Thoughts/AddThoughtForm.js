import React, {useState} from 'react';
import { generateId, getNewExpirationTime } from './utilities';

export function AddThoughtForm(props) {
  const [text, setText] = useState('');
  
  function handleTextChange(event){
      setText(event.target.value);
      
  }

  function handleSubmit(event){
    event.preventDefault()
    const thought = {
      id: generateId(),
      text: text,
      expiresAt: getNewExpirationTime(),
      };
    text && props.addThought(thought)
    setText("")
  }

  return (
    <form className="AddThoughtForm" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="What's on your mind?"
        placeholder="What's on your mind?"
        value={text}
        onChange={handleTextChange}
      />
      <input type="submit" value="Add" />
    </form>
  );
}
