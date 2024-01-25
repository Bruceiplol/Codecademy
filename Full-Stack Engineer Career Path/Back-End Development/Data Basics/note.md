# What is a Relational Database Management System (RDBMS)?
- A **database** is a set of data stored in a computer. This data is usually structured in a way that makes the data easily accessible.
- A **relational database** is a type of database. It uses a structure that allows us to identify and access data in relation to another piece of data in the database.

#### Tables: Rows and Columns
- These rows are often called *records*.
- Tables can also have many columns of data. Columns are labeled with *a descriptive name* and have *a specific data type*.

### Relational Database Management System
- A relational database management system (RDBMS) is a program that allows you to create, update, and administer a relational database. Most relational database management systems use the **SQL language** to access the database.
- **MySQL**: open source SQL database. It is typically used for web application development, and often accessed using PHP.
  - advantages: easy to use, inexpensive, reliable
  - disadvantages: poor performance when scaling, open source development has lagged
- **PostgreSQL**: open source SQL database, it is typically used for web application development.
  - advantages: easy to use, inexpensive, reliable, provides some additional features such as foreign key support without requiring complex configuration
  - disadvantages: can be slower in performance than MySQL
- **SQLite**: open source, popular choice for databases in cellphones, PDAs, MP3 players, set-top boxes, and other electronic gadgets.
  - advantages: can store an entire database in a single file, all of the data can be stored locally without having to connect your database to a server.
- **Oracle DB**: not open sourced,  for large applications, particularly in the banking industry. not free to use
- **SQL Server**: Microsoft owned, close sourced, Large enterprise applications

---
-  If your file ends in .sqlite, you’re using a SQLite database.
-  If your file ends in .sql, you’re working with PostgreSQL.

---
# NoSQL
- “not-only SQL”, but is also commonly called “non-relational” or “non-SQL”
- Any database technology that stores data differently from relational databases can be categorized as a NoSQL database
<br>
##### Benifits
- **Scalability**: NoSQL was designed with scalability as a priority. NoSQL can be an excellent choice for massive datasets that need to be distributed across multiple servers and locations.
- **Flexibility**: Unlike a relational database, NoSQL databases don’t require a schema. This means that NoSQL can handle unstructured or semi-structured data in different formats.
- **Developer Experience**: NoSQL requires less organization and thus lets developers focus more on using the data than on figuring out how to store it.
<br>
##### Drawbacks:
- **Data Integrity**: Relational databases are typically ACID compliant, ensuring high data integrity. NoSQL databases follow BASE principles (basic availability, soft state, and eventual consistency) and can often sacrifice integrity for increased data distribution and availability. However, some NoSQL databases do offer ACID compliance.
- **Language Standardization**: While some NoSQL databases do use the Structured Query Language (SQL), typically, each database uses its unique language to set up, manage, and query data.

#### Types of NoSQL Databases
- Key-Value database
- Document-based database
- Graph database
- Column-oriented NoSQL database
