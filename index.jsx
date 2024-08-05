
 import { createRoot } from 'react-dom/client'
 import Contact from './Components/Contact'
import App from './App'
 import Header from './Components/Header'

//EP22 : React Router
//install : npm i react-router-dom, Setup : following 2 snippets :
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"
import Header from './Components/Header'
import Home from './Components/Home'
import Error from './Components/Error'
import CountryDetail from './Components/CountryDetail'

//Routes can be defined here: error component by coder
const router = createBrowserRouter( [
    {
        path : '/',
        element : <App/>,
        errorElement : <Error/>,
        children: [
            {
                path : '/',
                element : <Home/>
            }
        ]
    },
    {
        path : '/contact',
        element :<Contact/>
    },
    {
        path : '/:country',
        element :<CountryDetail/>
    }
])

 const root = createRoot(document.querySelector('#root'))
const h1 = <h1>Hi</h1>

// Until Router was not used:
//  root.render(<App/>)

//After Router is used: Header will be passed to all routes
root.render(
<>
{/* <Header/> */}
<RouterProvider router={router}/>
</>)


// path : '/:country', : means infinite number of routes -> any non-specified route when requested will give the /country page