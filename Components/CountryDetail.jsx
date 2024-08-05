import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import './countryDetail.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import Header from './Header'
import CountryDetailShimmer from './CountryDetailShimmer'
const CountryDetail = () => {
  // On clicking the card, actual details of the country are shown using this component


  // const countryName = new URLSearchParams(location.search).get('name')
  /*

  location.search retrieves the query string part of the URL, which includes everything after the ?.
new URLSearchParams(location.search) creates a new URLSearchParams object, which provides utility methods to work with the query string.
.get('name') extracts the value associated with the name key from the query string.
  */

  //Dynamic Routing : Step 1: :/country in index.js
  // Step 2: Using useParams(): This disables the functionality of clicking on the cards and going to the details for the time being.
  // Only writing url/country_name will give the country details. After Step 3 in CountryCard, we can click on card and get the details.

  const params = useParams()
  console.log(params)
  const countryName = params.country //object value = country

  //To access data received from another page(inside 'state')
  const { state } = useLocation()
  console.log(state)

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  // When we open the main page of the website, data of all the countries are fetched. However, when we open the particular country's card,
  //its data as well as data of its border countries are also fetched. (Concept of History API used begind the scenes)
  async function updateCountryData(data) {
    //Refer Notes.jsx for explanation
    let borders = []; //borders is set empty because if a country has no border countries, empty array is set in 'borders' and there is no error
    if (data.borders && Array.isArray(data.borders)) {
      borders = await Promise.all(
        data.borders.map((border) =>
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common)
        )
      );
    }

    // const borders = await Promise.all(
    //   data.borders.map((border) =>
    //     fetch(`https://restcountries.com/v3.1/alpha/${border}`)
    //       .then((res) => res.json())
    //       .then(([borderCountry]) => borderCountry.name.common)
    //   )
    // );


    const nativeNameObject = data.name ? Object.values(data.name)[0] : null;
    // const nativename = nativeNameObject ? nativeNameObject.common : 'N/A';

    // console.log(nativeNameObject);
    // console.log(Object.values(data.currencies))
    // console.log(Object.values(data.currencies).map((currency) => currency.name))
    // console.log(Object.keys(data.currencies))
    // console.log(Object.values(data.languages))
    // console.log(Object.values(data.capital))

    setCountryData({
      name: data.name.common,
      nativename: data.name ? Object.values(data.name)[0] : '', //optional chaining to get nativeName
      population: data.population,
      region: data.region,
      subregion: data.subregion ? data.subregion : '',
      capital: [] || Object.values(data.capital?.join(', '))
        ,
      flag: data.flags.svg,
      tld: data.tld,

      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
      // countries like Bahamas have multiple currencies, to show them, Object.values() converts data.currencies object into an array,
      //then mapping over the 'name' attribute of the ARRAY OF OBJECTS,
      //  it gives all the values in an ARRAY but to seperate the values and show them as a string, join() is used


      languages: Object.values(data.languages || {})
        .join(', '),
      //languages is a simple object, not an array of objects, so, Object.values() returns a simple array of Strings which are joined later
      //same for 'capital'

      borders: borders,
    })

  }

  useEffect(() => {

    if (state) //using 'state', we are passing country data from main page to countryDetails page -> if user goes to countryDetails page directly(state=null),
    //then data has to be fetched otherwise it can be obtained from the previous page
    {
      updateCountryData(state)
      return //to avoid further fetching of data
    }


    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => {
        return res.json()
      }) //array -> countries is given in 'res'

      .then(async ([data]) => { //Array destructuring to get 1st name(array had only 1 element ccontaining all info of country)
        console.log(data)


        updateCountryData(data)

        /*IMPORTANT :
        data.borders array is not defined when the .map() method is called. This can happen if data or data.borders is undefined or null.
        To handle this issue, you need to ensure that data.borders is defined before attempting to use the .map() method on it. 
        You can add a check to see if data.borders is an array before calling .map().*/

        // if (data && data[0] && Array.isArray(data[0].borders)) {
        //  Promise.all( data.borders.map( (border) =>{
        //     fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        //     .then((res) => res.json())
        //     .then( ([borderCountry]) => {
        //       // console.log(borderCountry.name.common) 
        //       // setCountryData((prevState)=>({...prevState, borders: [...prevState.borders, borderCountry.name.common]}))
        //       return borderCountry.name.common
        //     })
        //   })
        // )
        // }
      })
      .catch((error) => {
        console.log("Error:", error)
        setNotFound(true) //handling the error of passing a route other than country name
      })
  }, [countryName]) //empty dependency array to stop infinite network calls, EP24: Later, in dpeendency array, countryName is added
  //because when in CountryDetails, we want to render BORDERS, then countryName which is present after '/' of url changes on clicking
  //on borders(due to Link tag) and change in it causes useEffect to fetch its data.


  console.log(countryData)
  /*
  Object.values(country.name.nativename) converts the values of the nativename object into an array.
[0] accesses the first element in this array.
  */

  if (notFound) {
    return <div>Country not found</div>
  }

  //Dark mode
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('isDarkMode'))
  )
  // const [isDark] = useOutletContext()
  return countryData === null ? (
    'loading'
  ) : ( //until entire countryData is not loaded, user is not shown the page to avoid errors, not good experience, solution : shimmer effect
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
      {/* <Header /> */}
      <main  className={`${isDark? 'dark': ''}`}>
        <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          {/* history.back() to go to previous page */}
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer/>
        ) : (
        <div className="country-details">
          <img src={countryData.flag} alt={countryData.name} flag />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>

            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativename || countryData.name}</b>
              </p>
              <p>
                <b>Population: {countryData.population ? countryData.population.toLocaleString('en-IN') : null}</b>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
              </p>
              <p>
                <b>Capital: {countryData.capital}</b>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>

              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>

              </p>
              <p>
                <b>Languages: {countryData.languages}</b>

              </p>
            </div>
            {/* Borders inside another JSX */}
            {
              countryData.borders.length !== 0 &&
              <div className='border-countries'>
                <b>
                  Border Countries: </b>&nbsp;
                {
                  countryData.borders.map((border, index) => (
                    <Link key={index} to={`/${border}`}>{border}</Link>
                  ))
                }


              </div>

            }

          </div>
        </div>
       
          )}
      </div>
      </main >
    </>
  )

}

export default CountryDetail