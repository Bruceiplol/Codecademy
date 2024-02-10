# MVC Architecture for Full-Stack App
- We will be using PostgreSQL as our database.
```
CREATE TABLE expenses(
    expense_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    price DECIMAL(10, 2) NOT NULL, 
    category VARCHAR(30) NOT NULL, 
    essential BOOLEAN NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL
);
```
1. In the root of the folder, create a .env file.
```node
///.env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_POST=5432
DB_DATABASE=expenses
PORT=8000
```
2. Run `npm install` to install Node package dependencies in the root directory of starting-code and in the starting-code/view folder in two separate terminal windows
3. run `npm run start` in the starting-code and starting-code/view folders

## Tutorial steps
### Step 1: getting started with model and controller
- controllers/index.js: functions allows for querying or manipulating the PostgreSQL database and leverages a CRUD (create, read, update, and delete) API.
- models/database.js: connects our application to the PostgreSQL database.
- models/expense.sql: helps us define the data structure of each collection in our database as well as the name of our database.
- utils/index.js: a function for form field validation.
- server.js: connect and run our Express server with route middlewares.

### Step 2: connecting the Model and Controller
- Inside of routes/expense.js, we will create routes that access the controller’s functions.
```
// require the middlewares and callback functions from the controller directory
const { create, expenseById, read, update, remove, expenseByDate } = require('../controllers');

// Create POST route to create an expense
router.post('/expense/create', create);

// Create GET route to read an expense
router.get('/expense/:id', expenseById, read);

// Create PUT route to update an expense
router.put('/expense/:id', expenseById, update);

// Create DELETE route to remove an expense
router.delete('/expense/:id', remove);

// Create GET route to read a list of expenses
router.get('/expense/list/:expenseDate', expenseByDate, read);
```

### Step 3: getting started with the view
-  view/src/components/ExpenseList.js: responsible for populating a list of expenses for a given date. It also contains functionality to handle updating and deleting an expense.
-  view/src/components/LogExpense.js: where the user can enter the data necessary to either create or update an expense.
-  view/src/components/Model.js: present the component exported from LogExpense.js as a model.
-  view/utils/index.js: houses all of the functions needed to interact with the controller from the views.
-  view/src/App.js: where the application comes together. We can consider this file the “view” of our application.

### Step 4: connecting the view and controller
- To connect the Controller and View, we will add functions to our views that relay user action and update the view.
```
// view/src/App.js
// add some code that will fetch a list of expenses from the database for the current day and then set them to the expenses state, which will update the view.
import { fetchExpenses, expenseByCategory } from './utils';

 useEffect(() => {
    // update view from model w/ controller
    fetchExpenses().then((res) => setExpenses(res));
  }, []);
```
```
// view/src/App.js
// Within the <DatePicker/>, we will need to update the view as different dates are selected.
onChange={(newValue) => {
                setSelectDate(newValue);
                // update view from model w/ controller
                fetchExpenses(newValue.getTime())
                  .then((res) => setExpenses(res));
              }}
```
```
// view/src/App.js
// within the <Modal />,  we’ll need to update the function passed into the refreshExpenses prop. When this function is called we’d like to fetch and refresh the list of expenses with the currently selected date.
<Modal
  // props
  refreshExpenses={async () => {
    const res = fetchExpenses(selectDate.getTime());
    setExpenses(res)
  }}
  // other props
/>
```
```
// view/src/components/ExpenseList.js
// we will communicate with the controller to remove an entry from the model.
import { deleteExpense } from '../utils';

const handleDelete = async (_id) => {
  // send user action to controller
  await deleteExpense(_id);
  setExpenses(expenses.filter((expense) => expense.expense_id !== _id));
};
```
```
// view/src/components/LogExpense.js.
// This component allows the user to create and update individual expenses.
// Once the creation or update is completed, the new model data is fetched from this component and then sent to App.js
import { createExpense, fetchExpense, formSetter, updateExpense } from '../utils';

// The setExpenseData() function is called anytime that an expense id is set. This function updates the state with the data of the expense whose id was passed.
const setExpenseData = async (id) => {
    // update view w/ data from model
    const expenseById = await fetchExpense(id);
    setExpense(expenseById[0]);
  };

// The expenseListRefresh() function is called anytime an expense is created or updated. This function sets the error state within the view if an error is sent back from the controller. If the expense is created or updated successfully, it fetches and refreshes the expenses list for the currently selected date.
const expenseListRefresh = async (res) => {
    if (res) {
      return setErr(res);
    }
    refreshExpenses()
    handleClose()
  };

// The handleSubmit() function handles the action to either create or update an expense. In both cases, the form data is sent to the controller to alter the model.
const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('essential') === null) {
      data.set('essential', false);
    }
    if (_id) {
      formSetter(data, expense);
      // update data from model w/ controller
      const res = await updateExpense(_id, data);
      expenseListRefresh(res);
    } else {      
      // add data to model w/ controller
      data.set('created_at', expense.created_at);
      const res = await createExpense(data);
      expenseListRefresh(res);
    }
  };
```
