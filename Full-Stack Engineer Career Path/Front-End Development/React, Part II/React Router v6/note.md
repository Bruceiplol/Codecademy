### Install
1. npm install
2. npm install --save react-router-dom@6

---   
### Setup
In top-level file (App.js):
```javascript
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
const router = createBrowserRouter( /* application routes are defined here */ );
<RouterProvider router={ router } />
```

---
Each <Route> component should include:
1. A **path** prop indicating the exact URL path that will cause the route to render.
2. An **element** prop describing the component to be rendered.
<br>
example:
```javascript
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/about' element={ <About/> } />
));
```

---
### Link and NavLink
Both **Link** and **NavLink** components work much like anchor tags:<br>
They have a **to** prop (and className prop)that indicates the location to redirect the user to, similar to the anchor tag’s href attribute.<br>
They wrap some HTML to use as the display for the link.

```javascript
<Link to="/about">About</Link>
<NavLink to="/about">About</NavLink>
```
<br>

**NavLink can also use style prop**, and able to pass function into className (conditional style)<br>
<br>

e.g 

```javascript
<NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null}> Info </NavLink>
```
(When **activeStyle** is applied to the NavLink (if there is **index** prop in <Route/>), **end** prop is used to stop isActive status for the index page)<br><br>
"/about" => **absolute path** (start from root)<br>
"about" => **relative path** (if nested => auto next path level)

---
### Dynamic Routes
```javascript
const route = createBrowserRouter(createRoutesFromElement(
  <Route path='/articles/:title' element={ <Article /> }/>
))
```

Using **useParmas** hook in the component:
```javascript
import { Link, useParams } from 'react-router-dom';
  
export default function Article() {
    
  let { title } = useParams();
  // title will be equal to the string 'objects'
  
  // The title will be rendered in the <h1>
  return (
    <article>
      <h1>{title}</h1>
    </article>
  );
```
---
Render Child Route (expanding/ displaying the secret components at the same page):<br>
nested route + \< Outlet /> <br>
parent route = share UI (shared layout: navbar or footer) -- usually <Link /> or < NavLink /> + < Outlet /> <br>

---
index:
```javascript
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Route>
```

Passing saved **state** (info) to child <br>
parent: 
```javascript
import { Outlet } from "react-router-dom"

<Outlet context={{ someState }} />
```
child: 
```javascript
import { useOutletContext } from "react-router-dom";
//inside component
const { someState } = useOutletContext();
```
       
---
### Navigate
Redirect -- \<Navigate />: (can be used for login logout) -- declarative
```javascript
import { Navigate } from 'react-router-dom';
//inside component
<Navigate to='/' />
```

**useNavigate()**: -- imperative <br>
For example:<br>
```javascript
navigate(-1) //- navigate to the previous URL in the history stack.
navigate(1) //- navigate to the next URL in the history stack.
navigate(-3) //- navigate 3 URLs back in the history stack.
```
example:
```javascript
import { useNavigate } from `react-router-dom`

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
  )
}
```
---
Another way:
```javascript
<Link
    to=".."
    relative="path"
    className="back-button"
>&larr; <span>Back</span></Link>
```

---
### Link state prop & useLocation() hook
By using the **state** prop, you can pass and retrieve data between components during navigation using React Router.<br><br>
\<Link /> prop: **state={{ search: searchParams.toString() }** -- saving state between one link(URL) and the next<br>
next component: receiving state from above: **useLocation()**<br><br>
eg. {pathname: "/vans/5", search: "", hash: "", state: {search: "type=luxury"}, key: "emy8w7js"}<br>

```javascript
const search = location.state?.search || ""
<Link to={`..${search}`} /> -- back to previous page with saved filtered
```

---
### Query Parameters
uery parameters can be useful in determining which content to display to our user and React Router provides a mechanism for grabbing query parameter values with the useSearchParams() hook.<br>
- Sorting, Filtering, Pagination
- Begins with "?"
- Seperate by "&"
- searchParams = URLsearchParams {}
<br>
useful tools:<br>
- searchParams.get("")<br>
- searchParams.toString()<br><br>

e.g.

```javascript
//inside component
const typeFilter = searchParams.get("type")

const displayedCharacters = typeFilter 
    ? swCharacters.filter(char => char.type.toLowerCase() === typeFilter)
    : swCharacters
const const charEls = displayedCharacters.map(char => (<>{char.xxxx}</>)
```

#### For UI:
hardcoding (single filter):<br>
- using <Link to"?type=xxx" /> for clicking filter ("clear" = link to ".")
- <button onClick={() => setSearchParams({type: xxx})} ("clear" = setSearchParams({}))
<br>
imperative coding (merge existing params -- multiple params filter):<br>
1. 

```javascript
function genNewSearchParamString(key, value) {
    const sp = new URLSearchParams(searchParams)
    if (value === null) {
      sp.delete(key)
    } else {
      sp.set(key, value)
    }
    return `?${sp.toString()}`
  }

<Link to={genNewSearchParamString("type", "jedi")}>Jedi</Link>
```

2. 
```javascript
function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }
<button onClick={() => handleFilterChange("type", "jedi")}>Jedi</button>
```

---
example

```javascript
import { useSearchParams } from 'react-router-dom'

// Rendered when a user visits "/list?order=DESC"
export const SortedList = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const sortOrder = searchParams.get('order');

  if (sortOrder === 'ASC') {
    // render the numberList in ascending order
  } else if (sortOrder === 'DESC') {
    // render the numberList in descending order
  } else {
    // render the numberList as is
  }
}
```

```javascript
import { useSearchParams } from 'react-router-dom';

// Rendered when a user visits "/list"
export const List = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  // render the numberList in ascending order
  <button click={ () => setSearchParams( {order: 'ASC'} ) }>
    Sort 
  </button>
}
```

```javascript
import { useNavigate, createSearchParams } from 'react-router-dom';
// get navigate function
const navigate = useNavigate();

// define an object where the key is is the query parameter name and value is query parameter value
const searchQueryParams = {
  order: 'ASC'
}

// use createSearchParams which takes an object and transforms it to a query string of the form order=ASC
const searchQueryString = createSearchParams(searchQueryParams);

// force a navigate by passing in an object with pathname indicating that path to navigate and search indicating the query parameters to append
navigate({
  pathname:'/list',
  search: `?${searchQueryString}`
})
```

---
### Handle 404 Not Found to users:
```javascript
<Route path="*" element={<h1>Page not found!</h1>} />
```
path as **"*"** to catch all pages out of scope except our routes

---
### Fetching Data -- loader prop + useLoaderData() hook
instead of useing React.useEffect to fetch, use Loader. (Waterfall request => Parallel loaders)<br>
useEffect: <br>
/about => /van => loading => fetching from api => display <br><br>
loader: <br>
/about => delay a little => /van with loaded data immediately (skipped loading and error state) -- delay rendering the element until the loader has finished its tasks<br>

1. export a loader function from the page that fetches data that the page will need.
2. pass a loader prop to the Route that renders that page and pass in the loader function
3. use the useLoaderData hook in the component to get the data
<br>

eg.

```javascript
//App:
import HomePage, { loader as homePageLoader } from "./Home"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<HomePage />} loader={homePageLoader} />
))
```

```javascript
//child component:
import { useLoaderData } from "react-router-dom"

export function loader() {
  return (<>this is loader</>)
}

export default function HomePage() {
  const data = useLoaderData()
 
  return (
    <main>
      <h1>Home page</h1>
    </main>
  );
}
```

normally loader function return getAPI request, then we can have const data = useLoaderData()

----
### Handling Error

errorElement prop in Route

```javascript
<Route path="/" element={<HomePage />} **errorElement={<Error />}** loader={homePageLoader} />
```

inspecting error message:

```javascript
//in child component:
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    
    return (
        <>
        <h1>Error: {error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        </>
    )
}
```

---
### Protected Routes:
Prevent rendering to unauthorized users<br>
Approach: If the user has not logged in, stop data fetching by blocking components from rendering and send to Login page.<br>
          Since fetching is happending inside the components, if those components nevenr render, the fetching never happens.<br><br>

Wrap the protected route inside Authorize Route
```javascript
<Route element={<AuthRequired />}>
  <Route path="protected" element={<h1>Super secret info here</h1>} />
</Route>
```
```javascript
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = false
    if (!isLoggedIn) {
        return <Navigate to="/login" /> ------- use Navigate to auto redirect
    }
    return <Outlet />
}
```
For loaders to load data in protected routes (parallel loaders):<br>
use redirect() -- but it needs to happend in every protected route's loader
```javascript
<Route
  path="protected"
  element={<h1>Super secret info here</h1>}
  loader={async () => {
    const isLoggedIn = false
    if(!isLoggedIn) {
      throw redirect("/login")
    }
    return null
  }}
/>
```

---
### useNavigate() hook
useNavigate: similar to redirect, but can only operate inside the component function<br><br>
```javascript
import { useNavigate } from 'react-router-dom';

//inside component function
  const navigate = useNavigate()
  navigate("/somePath")
```
---
### Retrieving info from url:
If there is an message in url: "/login?message=You must log in first."
```javascript
//in the component file but outside the component function
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
```
then import loader to the app Route \<Route path="/login" element="<Login />" loader={loginLoader} />.<br>
then const the message inside the component.

---
### \<Form /> 
\<Form /> react-router-dom component (different from \<form />)<br>
Form would not need to deal with state to storing form data, handleChange, handleSubmit<br><br>

#### action prop + useActionData() hook
**action** prop in Route (similar to loader)<br>
react router action (normally action prop should send data to backend such as php file)<br>
If we only working on front-end, react router action function intercept the request and abel to access inside the action function<br><br>

**useActionData** hook inside the function component to get Action return<br><br>

#### replace prop in Form
forget the current Route in the history stack
```javascript
<Form method="post" className="login-form" replace> </Form>
```

#### useNavigation() hook
since our loading in loader is in action funtion (getting API), we cannot access data inside it<br>
utility to setup status prop in our component, give us info about the status about the loader<br><br>
```javascript
const navigation = useNavigation()
```

able to access the following:
```javascript
{
  navigation.state; //-- idle/ submitting
  navigation.location;
  navigation.formData;
  navigation.json;
  navigation.text;
  navigation.formAction;
  navigation.formMethod;
}
```
---
### defer & Await
when to use:<br>
If one of your routes' loaders needs to retrieve some data that is quite slow.<br><br>
Usually it supposes to render the element after the loader loading finished,<br>
defer loading the slow data so that it will not block the User Interface => smoother UX

```javascript
import { useLoaderData, defer } from "react-router-dom"

export async function loader() {
    const weatherPromise = getWeather() //cancel out await, so the value become a promise return
    return defer({weather: weatherPromise}) //defer need to be passed in a object, key can be whatever name, value to be the promise
}
```
<br>
Since we did not await to get API call and returning a Promise object, useLoaderData no longer fetch the API data.<br>
loader data became => {weather: Promise {}}<br><br>

**Await Component**:
- allow us to surrond the codes that we will be waiting for when the component first renders
- it will only conditional render only after the data has finished loading

```javascript
import { useLoaderData, defer, Await } from "react-router-dom"

//inside component function return()
<Await resolve={loaderData.weather}>
  {(loadedWeather) => {
    const iconUrl = `http://openweathermap.org/img/wn/${loadedWeather.weather[0].icon}@2x.png`
    return (
            <>
              <h3>{loadedWeather.main.temp}ºF</h3>
              <img src={iconUrl} />
            </>
            )
    }}
</Await>
```
1. passing the Promise into Await resolve prop
2. after await component resolving the promise, we can call a render prop child function {()=>{}}
3. passed params can be anything name, it substitues the original loaderData
4. so finally we can return the components

**Suspense Component** (from react library)
suspense rendering of your react app until something has finished<br>
fixing await bug<br>

```javascript
import React, {Suspense} from "react"

//inside component function return()
<Suspense fallback={<h2>Loading weather...</h2>}>
  <Await resolve={loaderData.weather}>
    {(loadedWeather) => {
      const iconUrl = `http://openweathermap.org/img/wn/${loadedWeather.weather[0].icon}@2x.png`
      return (
              <>
                <h3>{loadedWeather.main.temp}ºF</h3>
                <img src={iconUrl} />
              </>
              )
      }}
  </Await>
</Suspense>
```

**fallback** prop (loading status): give react an element to render while it's waiting for the other component that is suspending to finish<br><br>

If there is two getAPIs, we can turn the loader function into async function, put await in front of the getAPI calls that is more crucial or want to load it faster<br>
so the component would render the getUser as soon as await getAPI is finished while the other one is still resolving
```
export async function loader() {
    return defer({ vans: getVans(), user: await getUser() })
}
```
---
