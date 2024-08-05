import React from 'react'

import './CountriesListShimmer.css'
const CountriesListShimmer = () => {
    // new Array(10).fill(undefined) -> technique to fill arrays with values so that it can be looped

    
  return (
    <div className='countries-container'>
      
      {/* Multiple cards to show shimmer effect while loading */}
     {
     Array.from({length:10}).map((el, index) => {
       return <div key={index} className="country-card shimmer-card">
        <div className="flag-container"></div>
            <div className="card-text">
              <h3 className="card-title"></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
       </div>
    })
    // map is used instead of for loops to return to UI
    }
    </div>
  )
}

export default CountriesListShimmer
