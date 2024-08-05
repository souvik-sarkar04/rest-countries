import React from 'react'
import { Link } from 'react-router-dom'


const CountryCard = ({ name, flag, population, region, capital, data }) => {
    console.log(data)
    return (
        <>

            {/* Passing dynamic data to component by destructuring props */}

            {/* <a className="country-card" href={`/country?name=${name}`}> */}
            {/* This anchor tag with /country in href is responsible for clicking the card and then getting country's data in new page */}



            {/* Step 3 of dynamic routing(earlier steps in CountryDetail) : change the 'to' attribute of Link */}

            {/* Passing data from one page to another -> Specified in Link, to pass object inside JSX -> apply {} then object's {name, flag, etc} */}
            <Link className="country-card" to={`/${name}`} state={data}>
                <div className='flag-container'>
                    {/* Link is used to move to next pages/routes WITHOUT RELOADING. Close the tag at the end of component. React-router-dom uses anchor
            tag behind the scenes in place of Link, createBrowserRouter uses history API -> history.pushState({},{}, url) to stop reloading */}

                    <img src={flag} alt={name + ' Flag'} />
                </div>
                <div className='card-text'>
                    <h3 className='card-title'>{name}</h3>
                    <p>
                        <b>Population: </b>
                        {population.toLocaleString('en-IN')}
                    </p>
                    <p>
                        <b>Region: </b>{region}
                    </p>
                    {/* <p><b>Sub Region: </b><span className="sub-region"></span></p> */}

                    {/* Optional chaining in Capital as few countries do not have value */}
                    <p>
                        <b>Capital: </b>{capital?.[0]}
                    </p>
                </div>
                {/* </a> */}
            </Link>
        </>
    )
}

export default CountryCard
