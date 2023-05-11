Flaxbox layout -- can have nested flexbox:
- flex containers
- flex items: direct child elements of a flex container -- all flex items shrink proportionally when the flex container is too small.

Display: 
- flex: container remains as block,  but it will change the behavior of its child elements (flex items). Child elements will not begin on new lines.
- inline-flex: allows us to create multiple flex containers that are also inline elements (remember to set the width).

1. justify-content: To position the items from left to right (declared on flex containers)
  - flex-start: all items will be positioned in order, starting from the left of the parent container, with no extra space between or before them.
  - flex-end: all items will be positioned in order, with the last item starting on the right side of the parent container, with no extra space between or before them.
  - center: all items will be positioned in order, in the center of the parent container, with no extra space between or before them.
  - space-around: items will be positioned with equal space before and after each item, resulting in double the space between elements.
  - space-between: items will be positioned with equal space between them, but no extra space before the first or after the last elements.

2. align-item: To position the items from top to bottom (declared on flex containers)
  - flex-start: all elements will be positioned at the top of the parent container.
  - flex-end: all elements will be positioned at the bottom of the parent container.
  - center: the center of all elements will be positioned halfway between the top and bottom of the parent container.
  - baseline: the bottom of the content of all items will be aligned with each other. (all items bottom align to the bottom of the highest flex-items)
  - stretch: if possible, the items will stretch from top to bottom of the container (this is the default value; elements with a specified height will not stretch; elements with a minimum height or no height specified will stretch).

3. flex-grow: specify if items should grow to fill a container and also which items should grow proportionally more or less than others. (declared on flex items)
  - default is 0
  - flex-grow: 1 (growing faster when enlarging the screen)
 
4. flex-shrink: specify which elements will shrink and in what proportions (declared on flex items)
  - default is 1 (shrinking correspondingly)
  - flex-shrink: 0 (no shrink when colloapsing the screen)
  -  flex-shrink: 2 (shrinking faster when colloapsing the screen)
  
5. flex-basis: specify the width of an flex item before it stretches or shrinks (declared on flex items)

6. flex: declare flex-grow, flex-shrink, and flex-basis all in one line (in-order) (declared on flex items)

7. flex-wrap: flex items to move to the next line when necessary (instead of shrinking) (declared on flex containers)
  - wrap: child elements of a flex container that don’t fit into a row will move down to the next line
  - wrap-reverse: the same functionality as wrap, but the order of rows within a flex container is reversed (for example, in a 2-row flexbox, the first row from a wrap container will become the second in wrap-reverse and the second row from the wrap container will become the first in wrap-reverse)
  - nowrap: prevents items from wrapping; this is the default value and is only necessary to override a wrap value set by a different CSS rule.

8. align-content: If a flex container has multiple rows of content, we can use align-content to space the rows from top to bottom. (declared on flex containers for mutiple rows)
  - flex-start: all rows of elements will be positioned at the top of the parent container with no extra space between.
  - flex-end: all rows of elements will be positioned at the bottom of the parent container with no extra space between.
  - center: all rows of elements will be positioned at the center of the parent element with no extra space between.
  - space-around: all rows of elements will be spaced evenly from the top to the bottom of the container with the same amount of space at the top and bottom and between each element.
  - space-between: all rows of elements will be spaced evenly from the top to the bottom of the container with no space above the first or below the last.
  - stretch: if a minimum height or no height is specified, the rows of elements will stretch to fill the parent container from top to bottom (default value).

9. flex-direction: By default, the main axis is horizontal and the cross axis is vertical (declared on flex containers)
  - row — elements will be positioned from left to right across the parent element starting from the top left corner (default).
  - row-reverse — elements will be positioned from right to left across the parent element starting from the top right corner.
  - column — elements will be positioned from top to bottom of the parent element starting from the top left corner.
  - column-reverse — elements will be positioned from the bottom to the top of the parent element starting from the bottom left corner.

10. flex-flow: declare both the flex-wrap and flex-direction properties in one line (declared on flex containers)
  - 
