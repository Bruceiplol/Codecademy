font-family:
- Multi-Word Values: use quotation marks (' ') to group the words together
- Web Safe Fonts: https://www.cssfontstack.com/; Web safe fonts are good fallback fonts that can be used if your preferred font is not available. 
- Fallback Fonts and Font Stacks: eg. font-family: Caslon, Georgia, 'Times New Roman';
- Serif and Sans-Serif: Serif is more convention-like and more extra details on the ends on main stroks of letters, whereas Sans-Serif no, more modern look

font-weight:
- Keyword Values
  - bold: Bold font weight.
  - normal: Normal font weight. This is the default value.
  - lighter: One font weight lighter than the element’s parent value.
  - bolder: One font weight bolder than the element’s parent value
- Numerical Values
  - from 1 (lightest) to 1000 (boldest), 
  - 400 = normal, 700 = bold

font-style:
- italic

text-transform:
- uppercase or lowercase

Text Layout:
- letter-spacing
- word-spacing
- line-height
- text-align
  - left — aligns text to the left side of its parent element, which in this case is the browser.
  - center — centers text inside of its parent element.
  - right — aligns text to the right side of its parent element.
  - justify— spaces out text in order to align with the right and left side of the parent element.

Web Fonts:
- Free font services, like Google Fonts and Adobe Fonts, host fonts that you can link to from your HTML document with a provided <link> element.
  - Google Fonts: https://fonts.google.com/; 
- use fonts downloaded from paid font distributors like fonts.com.  create a @font-face ruleset in your CSS stylesheet
  - OTF (OpenType Font)
  - TTF (TrueType Font)
  - WOFF (Web Open Font Format)
  - WOFF2 (Web Open Font Format 2)
  eg. @font-face {
    font-family: 'MyParagraphFont';
    src: url('fonts/Roboto.woff2') format('woff2'),
         url('fonts/Roboto.woff') format('woff'),
         url('fonts/Roboto.ttf') format('truetype');
      }

