- Position: specify the position of an element.
  - static: the default value (it does not need to be specified)
  - relative: (relative to its default position on the page, eg. position:relate + left:50px = push the element to the right 50px)
  - absolute: (pinned, would overlap with other elemenrs -- all other elements on the page will ignore the element and act like it is not present on the page, but it would move together when the page is scrolled)
  - fixed: (pinned, often used for navigation bars -- the element will remain in view no matter what.)
  - sticky: (an element can stick to a defined offset position when the user scrolls its parent container)

- Z-index: push away for overlapping

- Display: control how an element flows vertically and horizontally in a document.
  - inline: take up as little space as possible, and they cannot have manually adjusted width or height. (eg. strong, em,)
  - block: take up the width of their container and can have manually adjusted heights. (eg. h1~h6, p, div and footer)
  - inline-block: can have set width and height, but they can also appear next to each other and do not take up their entire container width.
 
- float: (left or right) move elements as far left or as far right as possible on a web page. (commonly used for wrapping text around an image)
- clear: (left, right, both, none) will not touch any other element within the same containing element.
