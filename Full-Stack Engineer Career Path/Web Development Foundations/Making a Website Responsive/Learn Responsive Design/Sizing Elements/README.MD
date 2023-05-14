em: relative size unit
  - represents the font-size of the current element or the default base font-size set by the browser if none is given. 
  - For example, if the base font of a browser is 16 pixels, then 1 em is equal to 16 pixels. 2 ems would equal 32 pixels, and so on.

Rem: another relative size unit. 
  - stands for root em.
  - The root element is the <html> tag.
  - Most browsers set the font size of <html> to 16 pixels, so by default rem measurements will be compared to that value. 
  
Percentages: Height & Width, Padding & Margin
  - often used to size box-model values, like width and height, padding, border, and margins.
  - also be used to set positioning properties (top, bottom, left, right).
  
Height & Width: Minimum & Maximum
  - min-width — ensures a minimum width for an element.
  - max-width — ensures a maximum width for an element.
  - min-height — ensures a minimum height for an element’s box.
  - max-height — ensures a maximum height for an element’s box.

Scaling Images and Videos
  usual format:
  - .container {
  width: 50%;
  height: 200px;
  overflow: hidden;
}
 
- .container img {
  max-width: 100%;
  height: auto;
  display: block;
}

Scaling Background Images
- body {
- background-image: url('#');
- background-repeat: no-repeat;
- background-position: center;
- background-size: cover;
- }
