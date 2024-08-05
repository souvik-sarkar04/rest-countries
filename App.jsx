import {React, useState} from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'
import {ThemeContext} from './contexts/ThemeContext'
import { ThemeProvider } from './contexts/ThemeContext'
// without export DEFAULT, apply {} to import

const App = () => {

   
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
  // const [isDark, setIsDark] = useState(false)


  return (

    // ThemeContext.provider value attribute overrides value passed in createContext() in ThemeContext.js
    // <ThemeContext.Provider value={[isDark, setIsDark]}>
      //<Header theme={[isDark, setIsDark]}/>
      // <Outlet context={[isDark, setIsDark]} /> 
      
    // <ThemeContext.Provider>
    <ThemeProvider>
    {/* An <Outlet> should be used in parent route elements to render their child route elements.  */}
    {/* Setting of dark mode from App.jsx :  to pass to home, use 'context' on Outlet*/}


    {/* <Header /> */}
    <Outlet />
    
    {/* Entire code of App.jsx is kept in home -> displayed in children of '/' route in index.jsx
    To reuse the component 'Header' -> we have kept it with Outlet in App.jsx */}
   
      
    </ThemeProvider>
    // </ThemeContext.Provider>
  )
}

export default App
 