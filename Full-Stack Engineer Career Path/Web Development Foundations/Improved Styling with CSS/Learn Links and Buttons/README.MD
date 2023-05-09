Link: poperty -- <a> a{}
- modify to draw users’ attention to their clickability.
  - eg. color, text-decoration:underline;
- adding title attribute: "tooltip" - additional context or advisory text for clickable elements. (in html)
- :hover
- cursor: pointer
- 4 states: 
  1. normal (not clicked) = :link
  2. hover = :hover
  3. active (currently being clicked) = :active
  4. visited (clicked) = :visited

Button: 
1. Skeuomorphic styling (real-life button alike)
example: 
.answer {
  border: 1px solid #466995;
  border-radius: 10px;
  box-shadow: 0px 4px;
}

.answer:active {
  margin-top: 24px;
  margin-bottom: 16px;
  box-shadow: 0px 0px;
  background-color: #C0D6DF;
  color: #fff;
}

2. Flat Design
example: 
  .answer:active {
  background-color: #C0D6DF;
  color: #ffffff;

}
