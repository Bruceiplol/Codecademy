# YAML
- YAML is a standard format for storing data.
- It originally stood for Yet Another Markup Language but now stands for YAML Ain’t Markup Language.
- YAML is often compared to JSON due to their similarities
-  YAML is generally considered more human-readable due to its use of whitespace for separating objects rather than curly braces or brackets.
-   It also offers additional features such as comments and object references.

## YAML Structure
an example YAML file called example.yaml:
```yaml
---
# Our first YAML document
bottle: wine
capitals:
  Japan: Tokyo
  Argentina: Buenos Aires
oceans:
  - Indian
  - Atlantic
  - Arctic
  - Pacific
…

```
- A YAML document begins with three dashes (`---`) and ends with three dots (`…`). These characters can separate multiple YAML documents within a single file.
-  `#`, which makes it a comment.
-  The bulk of this YAML document consists of mappings or key-value pairs, which are separated by a colon and a space (`: `).
  -  Every key must be a string and must be unique.
  -  Values can be nested mappings, as is the case with the value of capitals.
  -  They can also be sequences, as with the value of oceans, or scalars, as with the value of bottle.
- The use of whitespace is a crucial aspect of YAML. Notice how a line break separates each mapping. When objects are nested, indentation indicates which objects are a part of the same value.

### Sequences
- YAML sequences look a bit like lists or arrays in programming languages. They can contain any mix of data types, including nested sequences or mappings.
- Sequences are usually displayed on multiple lines, where each element begins with a dash, followed by a space, and ends with a line break.
- Sequences can also be written on a single line surrounded by brackets.

```yaml
fish:
  - Tuna
  - Trout
  - Salmon
numbers:
  - pi
  - 7
  - 1.1
planets: [Mercury, Venus, Mars]
```

### Scalars
- All remaining data types in YAML are scalars, also known as single value data types.
  - integers
  - floating-point numbers
  - booleans
  - null
  - strings

```yaml
scalars:
  - 1 #Numbers
  - 1.0 #Floats
  - True/ On/ Yes & False/ Off/ No #Booleans
  - null/ ~ #Null
  - "string"
```

- Strings: In YAML, strings generally do not need quotes. Two notable exceptions are as follows:
  - Use single or double quotes to create a value that would normally be interpreted as a different data type to be a string, i.e., “10” or "null"
  - Use double quotes to allow specific sequences to be escaped instead of treated as literals, such as "\n" representing a line break
```yaml
strings:
  - This string ends with a slash followed by n \n
  - "This string ends with a line break \n"
  - 'True'
```
