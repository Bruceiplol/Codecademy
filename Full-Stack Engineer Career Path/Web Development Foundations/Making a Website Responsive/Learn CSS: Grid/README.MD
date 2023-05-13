# for grid container
1 .Creating Grid:
- display: grid -- for a block-level grid
- display: inline-grid -- for an inline grid

2. Creating Columns and Rows
- grid-template-columns -- can set multiple px/ % (multiple = the numbers of columns)(the grid container set the width first)
- grid-template-rows -- can set multiple px/ % (multiple = the numbers of rows)(the grid container set the height first)

- Grid Template -- create grid rows and grid columns all in one line (in-order)
  eg. grid-template: 200px 300px / 20% 10% 70%;

3. Fraction:
- CSS grid relative sizing unit: fr
  Using fr makes it easier to prevent grid items from overflowing the boundaries of the grid.
  With a pre-setted height and width, fr is like splitting into parts
  eg. .grid {
  display: grid;
  border: 2px blue solid;
  width: 400px;
  height: 500px;
  grid-template: 1fr 1fr 1fr / 3fr 50% 1fr;
}
  so grid = 3 equal part of rows, 3 columns (1st column is 3/4 of 50%, 2nd is 50%, 3rd is 1/4 of 50%)

4. Repeat function:
- The repeat function will duplicate the specifications for rows or columns a given number of times. 
- e.g. grid-template-columns: repeat(3, 100px);
  so grid = 3 equal 100px columns

5. Minmax function:
- prevent a row or column from getting too big or too small. (resize based on the size of your web browser)
- e.g. grid-template-columns: 100px minmax(100px, 500px) 100px

6. Grid Gap:
- column-gap
- row-gap
- gap: setting grid rows and grid columns gap all in one line (row gap then column gap)

# for grid items
Multiple Row Items
- declare on item that want it to start from which row or column and until which end row or column (end column should +1 for the row you want to cover)
- .item {
  grid-row-start: 1;
  grid-row-end: 3;
}

- exmaple = this item is covering row 1-2

-grid-row: setting grid rows start and end in one line
grid-row: 1 / 3;

Multiple column Items
- similar to grid-rows
- grid-column-start, grid-column-end and grid-column
- we can use the keyword span to start or end a column or row, relative to its other end.
- .item {
  grid-column: 4 / span 2;
}
 
- exmaple = item grid column will span 2 column which is from fourth to fifth.

Grid Area
- setting above all in one line
- grid-row-start / grid-column-start / grid-row-end / grid-column-end





