# Outside-In Test-Driven Development (TDD)
### Red, Green, Refactor
- Test-driven development (TDD) is the process of writing tests before implementation code.
- You use the feedback from your tests to inform the implementation of a feature or outcome.
- A common approach to TDD is the red, green, refactor cycle.
- start "in the red" (test fails) > write the minimum implementation code "in the green" > refactor to be more efficiently or cleaner

### Outside-in TDD
 - A failing test (Red) does not always inform you to write new implementation code. 
 - Instead, it may require that you implement new functionality at a different level.

1. You start at the top of the stack, the view, and write tests as you work your way towards the database layer.
2. If a test pushes you to a lower level, you restart your red, green, refactor cycle by writing a new test. This test informs the implementation at your new layer. You continue the TDD cycle at this lower level until:
  - You need to drop another layer to implement the desired behavior
  - You have addressed the reason for dropping to the current layer
3. If a test pushes you to a lower level, you restart your red, green, refactor cycle by writing a new test. This test informs the implementation at your new layer. You continue the TDD cycle at this lower level until:
- The test passes — you can start another red, green, refactor cycle at the server level or step up to the view layer.
- The test fails — the server test that pushed you to the model layer fails, but for a different reason. This is common, and indicates that you’re making progress. This failure may indicate that you need to write additional implementation at the server level, or drop back to the model.

Example: <br>
You have a movie blog and want to develop a feature that renders user comments under your blog posts. The application should render no more than ten comments when a user lands on the web page. The application should present the comments in reverse chronological order (i.e. the most recent comment should be first).

#### Feature Testing
The first step is to write a feature test that checks if your web application is rendering comments to the browser. Let’s use the following outside-in TDD approach:
1. Write a test that checks for the presence of a comment under a blog post.
2. The test fails, because your web application does not render comments.
3. Because your web application generates HTML at the server layer, you drop to the server to address the error.

#### Server Testing
Because our web application renders unique comments from the database, we want to check that the server-generated HTML is dynamic.
1. Write a test that checks for the presence of a dynamically generated comment element in the server HTML.
2. The test fails, so we add implementation for a server-generated comment.
3. Once we’re in the green and consider refactoring, we want to write a test that calls a method at the model layer, let’s call it `Comment.latest()`. At the server layer, we’ll check if the method returns comments from the database.
4. Because this method doesn’t exist, we must drop to the model/database layer.

#### Model and Database Testing
At the model layer, we start by writing a test that informs the implementation of our `Comment.latest` method. This method requires that you interface with the web application’s database.
1. Write a test that checks if the `Comment.latest` method returns ten comments when the database has eleven comments.
2. Implement the `Comment.latest` method to return ten comments, so the test is green.
3. Once you’ve considered refactoring, write a test that checks whether the method returns the last ten comments in reverse chronological order.
4. Implement and refactor
5. Write a test that checks if `Comment.latest()` returns an empty array when your database is empty.
6. Implement and refactor
7. Write a test that checks if `Comment.latest` returns the correct number and order of comments when your database has between zero and ten comments in it.
8. Implement and refactor

#### Taking Stock
1. Feature: Comments are rendered to a user’s browser.
2. Server: The server generates an HTML field for comments.
3. Server: The server has access to ten comments from the database.
4. Model: The Comment.latest method returns ten comments from your database.
5. Model: The Comment.latest method returns the last ten comments in your database in reverse chronological order.
6. Model: The Comment.latest method returns an empty array when your database has zero comments.
7. Model: The Comment.latest method returns all of the comments when your database has between zero and ten comments.

#### Refactoring Your Test Suite
Consider the questions below when deciding how to refactor your suite:
- How much longer does it take to run my test suite with these new tests?
- Is the additional amount of time that your test suite takes to run acceptable?
- Is there overlap between any of my new tests?
- Is there overlap between my new tests and existing tests?
