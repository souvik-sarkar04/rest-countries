import React from 'react'

const SelectMenu = ({setQuery}) => {
  return (
    <div>
       {/* Filter of regions: */}
       <select className="filter-by-region" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
          <option hidden>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
    </div>
  )
}

export default SelectMenu
