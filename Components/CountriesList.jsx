import React, { useEffect, useState } from 'react'

//Import JSON Data from file
// import countriesData from '../countriesData'

import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'

const CountriesList = ({ query }) => {

  // Creates cards of all countries
  /*
  const array = countriesData.map((country, index) => {
    
    return <CountryCard   key={index}
    name={country.name.common} 
    flag={country.flags.svg} 
    population={country.population.toLocaleString('en-IN')}
    // toLocaleString() to write in Indian format
    region = {country.region}
    capital = {country.capital} />
    // capital = {country.capital?.[0]} />
  }
  )
  console.log(array)
  */

  //Search functionality: 


  //  const filteredCountries = countriesData.filter ( (country) => {
  // country.name.common.toLowerCase().includes('India') //case sensitive name
  // })

  //Import API Data using fetch(): 
  // fetch() sends request to server and waits for the data to be received, data does not come instantly so momentarily countriesData array
  //is empty so the UI is empty. It is a normal variable, but we need to use STATE VARIABLE.


  // This technique renders cards in UI, but it sends request every moment(observed in 'network' of Inspect element) -> load in backend.
  //  On every call of setCountriesData(), the page is re-rendered and request is sent -> continues till infinite time.
  // Optimisation : apply if statement on length of the array :
  // (Not recommended -> we want to empty the array for some functionality later -> array is emptied and then again fetch() is called)
  //Final solution : useEffect() hook

  /*
  const [countriesData, setCountriesData] = useState([])
  if(countriesData.length === 0)
  {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        
        
        setCountriesData(data)
      })
        }
     
        */
  //Component will be re-rendered again and again but useEffect()'s code will be run only ONCE(only if empty array is passed in last parameter -> dependency array
  // In dependency array, we can put the parameters which if changed, that will re-render the useEffect()'s code -> here, that parameter is 'count')
  // we can also MONITOR STATE using useEffect() -> here, change in 'count'

  const [countriesData, setCountriesData] = useState([])
  useEffect(() => {
    
    fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      
      
      setCountriesData(data)
    })
    

    
  }, [])

  
  const [count, setCount] = useState(0)
  useEffect(() => {
   console.log("Hi")
  
  /*
   const intervalId = setInterval(() => {
    console.log("Running countriesList component")
  }, [1000]);

  //unmounting of setInterval() using useEffect()
  return () => {
   clearInterval(intervalId)
  }
  */
}, [count])

if(!countriesData.length)
{
  return <CountriesListShimmer/>
}
{/* when countriesData is not fetched then loading page is shown by dummy empty cards, then cards are shown when data is cmpletely fetched */}
 



return (
    <>

{/* <main className={`header-container ${isDark ? 'dark' : ''}`}> */}



      {/* <h1>{count}</h1> */}
      {/* <button onClick={() => { setCount(count + 1) }}>Increase count</button> */}

      
      <div className="countries-container">

        {/* Rendering multiple elements in React: */}

        {countriesData.filter((country) =>
          country.name.common.toLowerCase().includes(query) ||  country.region.toLowerCase().includes(query) //case sensitive name, based on the query, the cards are rendered(Part 1 of Search functionality)
        ).map((country, index) => {

          return <CountryCard key={index}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population.toLocaleString('en-IN')}
            // toLocaleString() to write in Indian format
            region={country.region}
          
            capital={country.capital} 
            // Above data is not sufficient to render the countriesDetail page by fetching data from previous page, so, entire 'country' is passed into data
            data = {country}/>
          // capital = {country.capital?.[0]} />
        }
        )}
      </div>
{/* </main> */}
    </>
  )
}

export default CountriesList
