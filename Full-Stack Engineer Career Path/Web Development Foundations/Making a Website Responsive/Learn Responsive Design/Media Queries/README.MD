# Viewport Meta Tag
meta name="viewport" content="width=device-width, initial-scale=1" -- place inside the head tag -->

# Media Queries
- @media only screen and (max-width: 480px) {
  body {
    font-size: 12px;
  }
}
  - max-width / max-height / min-width / min-height
  - can have multiple conditions: + and 
  - range: (min-width: 320px) and (max-width: 480px)

# Another media feature
screen resolution: + dpi (Dots Per Inch) / dpc (dots per centimeter)
- Targeting screen resolution also helps users avoid downloading high resolution (large file size) images that their screen may not be able to properly display.
- @media only screen and (min-resolution: 300dpi) {
    /* CSS for high resolution screens */
}

# operator
1. and
  - require multiple media features. 
2. ,
  - Comma Separated List
  - needed to apply a style when only one of the below is true
  - example: @media only screen and (min-width: 480px), (orientation: landscape) {}
    - orientation media feature detects if the page has more width than height. 
    - landscape: if a page is wider
    - portrait: if a page is taller

# Breakpoints
- https://content.codecademy.com/courses/freelance-1/unit-5/screen-sizes.png?_gl=1*1xm7lzw*_ga*MDg0MDc3MTcxMS4xNjc4MjEyMzYy*_ga_3LRZM6TM9L*MTY4NDE2ODI5OC43Mi4xLjE2ODQxNzA2NTQuMC4wLjA.
- can use google dev tool
