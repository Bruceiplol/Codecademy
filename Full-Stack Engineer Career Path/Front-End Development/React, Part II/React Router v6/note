1. npm install
2. npm install --save react-router-dom@6

In file:
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
const router = createBrowserRouter( /* application routes are defined here */ );
<RouterProvider router={ router } />

===================================================================================================================================================================================
Each <Route> component should include:
1. A path prop indicating the exact URL path that will cause the route to render.
2. An element prop describing the component to be rendered.

example:
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/about' element={ <About/> } />
));

===================================================================================================================================================================================
Both Link and NavLink components work much like anchor tags:
They have a to prop that indicates the location to redirect the user to, similar to the anchor tag’s href attribute.
They wrap some HTML to use as the display for the link.
<Link to="/about">About</Link>
<NavLink to="/about">About</NavLink>

Nav can use className and style prop, able to pass function into className (conditional style)
e.g <NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null}> Info </NavLink>

"/about" => absolute path (start from root)
"about" => relative path (if nested => auto next path level)

===================================================================================================================================================================================
Dynamic Routes:
const route = createBrowserRouter(createRoutesFromElement(
  <Route path='/articles/:title' element={ <Article /> }/>
))

  Using useParmas hook:
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

Render Child Route (expanding/ displaying the secret components at the same page):
nested route + <Outlet />
parent route = share UI (shared layout: navbar or footer) -- <Link /> or < NavLink /> + < Outlet />

Passing saved state (info) to child
parent: <Outlet context={{ someState }} />
child: import { useOutletContext } from "react-router-dom";
       const { someState } = useOutletContext();
===================================================================================================================================================================================
Redirect -- <Navigate>: (can be used for login logout) -- declarative
import { Navigate } from 'react-router-dom';
<Navigate to='/' />

useNavigate: -- imperative
For example:

navigate(-1) - navigate to the previous URL in the history stack.
navigate(1) - navigate to the next URL in the history stack.
navigate(-3) - navigate 3 URLs back in the history stack.

import { useNavigate } from `react-router-dom`

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
  )
}
--------------------------------------------------------------------------------------------------------------
<Link
    to=".."
    relative="path"
    className="back-button"
>&larr; <span>Back</span></Link>

----------------------------------------------------------------------------------------------------------------
<Link /> prop: state={{ search: searchParams.toString() } -- saving state between one link(URL) and the next
next component: receiving state from above: useLocation()
eg. {pathname: "/vans/5", search: "", hash: "", state: {search: "type=luxury"}, key: "emy8w7js"}

const search = location.state?.search || ""
<Link to={`..${search}`} /> -- back to previous page with saved filtered

===================================================================================================================================================================================
Query Parameters:
uery parameters can be useful in determining which content to display to our user and React Router provides a mechanism for grabbing query parameter values with the useSearchParams() hook.
Sorting, Filtering, Pagination
Begins with "?"
Seperate by "&"
searchParams = URLsearchParams {}
useful tools: searchParams.get("")/ searchParams.toString()
e.g. const typeFilter = searchParams.get("type")

     const displayedCharacters = typeFilter 
       ? swCharacters.filter(char => char.type.toLowerCase() === typeFilter)
       : swCharacters
     const const charEls = displayedCharacters
    .map(char => (<>{char.xxxx}</>)

For UI: 
hardcoding (single filter):
    using <Link to"?type=xxx" /> for clicking filter ("clear" = link to ".")
    <button onClick={() => setSearchParams({type: xxx})} ("clear" = setSearchParams({}))

imperative coding (merge existing params -- multiple params filter):
1. 
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

2.
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
------------------------------------------------------------------------------------------------------------
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

import { useSearchParams } from 'react-router-dom';

// Rendered when a user visits "/list"
export const List = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  // render the numberList in ascending order
  <button click={ () => setSearchParams( {order: 'ASC'} ) }>
    Sort 
  </button>
}

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

===================================================================================================================================================================================
Handle 404 Not Found to users:
<Route path="*" element={<h1>Page not found!</h1>} /> -- path as * to catch all pages out of scope except our routes

===================================================================================================================================================================================
Fetching Data:
instead of useing React.useEffect to fetch, use Loader. (Waterfall request => Parallel loaders)
useEffect: /about => /van => loading => fetching from api => display 
loader: /about => delay a little => /van with loaded data immediately (skipped loading and error state) -- delay rendering the element until the loader has finished its tasks

1. export a loader function from the page that fetches data that the page will need.
2. pass a loader prop to the Route that renders that page and pass in the loader function
3. use the useLoaderData hook in the component to get the data

eg.
App:
import HomePage, { loader as homePageLoader } from "./Home"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<HomePage />} loader={homePageLoader} />
))

child component:
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

normally loader function return getAPI request, then we can have const data = useLoaderData()
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Handling Error:
errorElement prop in Route
<Route path="/" element={<HomePage />} **errorElement={<Error />}** loader={homePageLoader} />

inspecting error message:
in child component:
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

===================================================================================================================================================================================
Protected Routes:
Prevent rendering to unauthorized users
Approach: If the user has not logged in, stop data fetching by blocking components from rendering and send to Login page.
          Since fetching is happending inside the components, if those components nevenr render, the fetching never happens.

Wrap the protected route inside Authorize Route
<Route element={<AuthRequired />}>
  <Route path="protected" element={<h1>Super secret info here</h1>} />
</Route>

import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = false
    if (!isLoggedIn) {
        return <Navigate to="/login" /> ------- use Navigate to auto redirect
    }
    return <Outlet />
}

For loaders to load data in protected routes (parallel loaders):
use redirect() -- but it needs to happend in every protected route's loader
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
------------------------------------------------------------------------------------
useNavigate: similar to redirect, but can only operate inside the component function

import { useNavigate } from 'react-router-dom';

inside component function
const navigate = useNavigate()
navigate("/somePath")

===================================================================================================================================================================================
Retrieving info from url:
If there is an message in url: "/login?message=You must log in first."

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

then import loader to the app for the element.
then const the message inside the component.

===================================================================================================================================================================================
<Form /> react-router-dom component (different from <form/>)
Form would not need to deal with state to storing form data, handleChange, handleSubmit

action prop in Route (similar to loader)
react router action (normally action prop should send data to backend such as php file)
If we only working on front-end, react router action function intercept the request and abel to access inside the action function

useActionData hook inside the function component to get Action return

replace prop in Form:
forget the current Route in the history stack
<Form method="post" className="login-form" replace> </Form>

useNavigation():
since our loading in loader is in action funtion (getting API), we cannot access data inside it
utility to setup status prop in our component, give us info about the status about the loader

const navigation = useNavigation()
able to access the following:
{
  navigation.state; -- idle/ submitting
  navigation.location;
  navigation.formData;
  navigation.json;
  navigation.text;
  navigation.formAction;
  navigation.formMethod;
}
============================================================================================================================================================================================
