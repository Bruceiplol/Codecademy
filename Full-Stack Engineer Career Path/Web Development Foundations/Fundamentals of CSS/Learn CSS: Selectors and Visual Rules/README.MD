 - CSS can select HTML elements by type, class, ID, and attribute. 
   type: p {}; 
   class: .class {};
   ID: #id {};
   attribute: img[href='xxxx'] {};
   
- Multiple CSS classes can be applied to one HTML element.

- Classes can be reusable, while IDs can only be used once.

- Specificity: ID > classes > type

- Multiple selectors can be chained together to select an element. This raises the specificity but can be necessary.

- Nested elements can be selected by separating selectors with a space.

- Multiple unrelated selectors can receive the same styles by separating the selector names with commas.
