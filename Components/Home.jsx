import {React, useContext, useEffect, useState} from 'react'
import Header from './Header'

import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountryCard from './CountryCard'
import CountriesList from './CountriesList'
import {ThemeContext} from '../contexts/ThemeContext'
import { useOutletContext } from 'react-router-dom'
import '../App.css'
import { getWindowSize } from '../hooks/utility'


const Home = () => {
    //Search functionality: (Part 3 of Search functionality : Declaring the hook in App.jsx and passing its entities as props to components)
   const [query, setQuery] = useState('') 

//'theme' passed to Outlet in App.jsx -> Home.jsx receives the data

// const [isDark] = useOutletContext() //context is used to avoid prop drilling

//custom Context: 
// const [isDark]  = useContext(ThemeContext)

const [isDark, setIsDark] = useState(
  JSON.parse(localStorage.getItem('isDarkMode'))
)

//Custom hook getWindowSize from utility.js used: 
const windowSize = getWindowSize()

console.log(isDark)
  return (
    // <main className={`${isDark ? 'dark' : ''}`}>
    <>
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
    <div className="header-content">
      <h2 className="title"><a href="/">Where in the world?</a></h2>
      <p className="theme-changer" onClick={() => {
        console.log("Detail dark")
        // document.body.classList.toggle('dark')
       console.log( setIsDark(!isDark))
        // toggle -> clicking once : dark mode, clicking again : light mode

        // Storing in localStorage
        localStorage.setItem('isDarkMode', !isDark)
      }}>
        {/* making classNname dynamic to implement dark and light mode */}
        <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`}></i>
        &nbsp;&nbsp;{isDark ? 'Light' : 'Dark'} mode
      </p> </div>
  </header>   

    <main className={`${isDark ? 'dark' : ''}`}>
      {/* <Header /> */}
      <div className='search-filter-container'>

{/* passing hook entities as props to components */}
      <SearchBar setQuery={setQuery}/>
      <SelectMenu setQuery={setQuery}/>
      {/* <SelectMenu setQuery={setQuery}/> */}
      </div>
      
      {/* <h1 style= {{textAlign : 'center'}}>hi</h1> */}
     {query === 'unmount' ? '':  <CountriesList query={query}/>}
     {/* Unmount : cleanup -> Routing, return() in useEffect() */}
    </main>
    </>
  )
}

export default Home
