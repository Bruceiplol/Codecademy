Grid Template Areas
- The grid-template-areas property allows you to name sections of your web page
exmaple
```
 grid-template-areas: "header header"
                      
                      "nav nav" 
                      
                      "info services"
                     
                      "footer footer";
  ```
 grid-template-rows: 300px 120px 800px 120px;
    
 grid-template-columns: 1fr 3fr; 

it means 2 columns 4 rows

Handling Overlapping element:
- grid items using grid-area and z-index


1. justify-items: positions items from left to right (declare on grid container)
 - start: aligns grid items to the left side of the grid area
 - end:  aligns grid items to the right side of the grid area
 - center: aligns grid items to the center of the grid area
 - stretch: stretches all items to fill the grid area

2. iustify-content: position the entire grid along the row axis (declare on grid container)
 - start — aligns the grid to the left side of the grid container
 - end — aligns the grid to the right side of the grid container
 - center — centers the grid horizontally in the grid container
 - stretch — stretches the grid items to increase the size of the grid to expand horizontally across the container
 - space-around — includes an equal amount of space on each side of a grid element, resulting in double the amount of space between elements as there is before the first and after the last element
 - space-between — includes an equal amount of space between grid items and no space at either end
 - space-evenly — places an even amount of space between grid items and at either end

3. align-items: positions items from top to bottom (declare on grid container)
 - start — aligns grid items to the top side of the grid area
 - end — aligns grid items to the bottom side of the grid area
 - center — aligns grid items to the center of the grid area
 - stretch — stretches all items to fill the grid area

4. align-content: positions the rows along the column axis, or from top to bottom (declare on grid container)
 - start — aligns the grid to the top of the grid container
 - end — aligns the grid to the bottom of the grid container
 - center — centers the grid vertically in the grid container
 - stretch — stretches the grid items to increase the size of the grid to expand vertically across the container
 - space-around — includes an equal amount of space on each side of a grid element, resulting in double the amount of space between elements as there is before the first and after the last element
 - space-between — includes an equal amount of space between grid items and no space at either end
 - space-evenly — places an even amount of space between grid items and at either end

5. justify-self: specifies how an individual element should position itself with respect to the row axis. (override justify-items) (declare on grid item)
6. align-self: specifies how an individual element should position itself with respect to the column axis. (override align-items) (declare on grid item)
 - start — positions grid items on the left side/top of the grid area
 - end — positions grid items on the right side/bottom of the grid area
 - center — positions grid items on the center of the grid area
 - stretch — positions grid items to fill the grid area (default)

7. implicit grid: items fill up rows first, adding new rows as necessary. New grid rows will only be tall enough to contain the content within them. 
- grid-auto-rows: specifies the height of implicitly added grid rows. (declare on grid container)
- grid-auto-columns: specifies the width of implicitly added grid columns (declare on grid container)
 - pixels (px)
 - percentages (%)
 - fractions (fr)
 - the repeat() function

8. grid-auto-flow: specifies whether new elements should be added to rows or columns, and is declared on grid containers. (declare on grid container)
- row — specifies the new elements should fill rows from left to right and create new rows when there are too many elements (default)
- column — specifies the new elements should fill columns from top to bottom and create new columns when there are too many elements
- dense — this keyword invokes an algorithm that attempts to fill holes earlier in the grid layout if smaller elements are added

