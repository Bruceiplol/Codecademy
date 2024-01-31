- Many different tools have been created to help act as an interface between the core application and the data layer.
  - raw SQL
  - query builders
  - ORMs (object-relational mappers)


| Approach | Database / Programming focused	| Hands-on management |	Level of abstraction | Level of complexity |
|---|---|---|---|---|
| Raw SQL |	database-oriented |high |none | low | 
| Query builders |	mixed | low | low | low |
| ORMs | programming-oriented | low | high | high |

---
## Managing data with raw SQL or another database-native querying language
- Some applications interface directly with the database by writing and executing queries using the native language supported by the database engine. 
- raw SQL or direct use of any equivalent querying language gets you closest to the abstractions used by the database to store and manage the data, but forces you to do all of the heavy lifting of managing your data manually.

### Benefits
- Fewer Uncertainty: developers write and manage the database queries and handle the results explicitly. 
- Efficient Performance: By writing natively in SQL, you can employ all of your domain knowledge and common sense to avoid many classes of querying problems
- Flexibility: no abstraction leads to take advantage of all of the features of your database engine and express more complex queries.

### Drawbacks
- you must understand the underlying data structure in order to compose valid queries.
- it is entirely up to you to manage the safety of your input.
- SQL injection

---
## Managing data with query builders
- An SQL query builder adds a layer of abstraction above raw database-native querying languages.
- formalizing querying patterns and providing methods or functions that add input sanitation and automatically escape items for easier integration into applications.
- Usually, query builders provide an interface that uses methods or functions to add a condition to a query.

### Benefits
- Because query builders use the same constructions (methods or functions) as the rest of your application, developers often find them easier to manage long-term than raw database queries written as strings. 
- it doesn’t always hide the underlying querying language. it can be fairly transparent, which makes it easier for those familiar with the database to understand what an operation will do.
- support multiple data backends, abstracting some of the subtle differences in various relational databases

### Drawbacks
- SQL query builders still require you to understand and account for the database’s structures and capabilities.
- require you to define how the data you retrieve relates to your application data. There is no automatic synchronization between your in-memory objects and those in the database.
- the additional layer of abstraction can mean that sometimes certain operations are not possible using the provided methods.

---
## Managing data with ORMs
- Object-relational mappers (ORMs) are pieces of software dedicated to translating between the data representations in relational databases and the representation in memory used with object-oriented programming (OOP).
- ORM provides an object-oriented interface to data within the database, attempting to use familiar programming concepts and reduce the amount of boilerplate code necessary in order to speed up development.
- objects in object-oriented programming tend to encode a lot of states within them and can have complex relationships with other objects through inheritance and other OOP concepts.

### Active record vs data mapper ORMs
- Different ORMs employ different strategies to map between application and database structures. The two major categories are the active record pattern and the data mapper pattern.
- an active record object in your application represents a record within a database
- Active record implementations allow you to manage your database by creating and connecting classes and instances within your code.
- The data mapper pattern focuses on trying to decouple and translate between objects and database records while letting each exist independently.

### Benefits
- They help abstract the underlying data domain to something that is easy to reason about within the context of your application.
- ORMs help you access and manage data systems as an extension of your current work.
- remove a lot of the boilerplate necessary to interface with databases.

### Drawbacks
- the attempt at hiding the details of the database backend.
- The abstraction is never 100% complete and attempting to use an ORM without understanding the underlying querying language or database structure often leads to problematic assumptions.
- object-relational impedance mismatch, a term used to describe the difficulty of translating between object-oriented programming and the relational paradigm used by relational databases.
