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
