import React from 'react'

const SearchBar = ({setQuery}) => {
  return (
    <div>
      <div className="search-filter-container">
        {/* Search container : */}
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass"></i>

         {/* Search functionality :(Part 2 of Search functionality)) : */}
    <input type="text" onChange= {( (e) => {
      setQuery(e.target.value.toLowerCase())
})}/>
{/* React onChange is an event handler that triggers when there is any change in the input field.
This event captures the changes in an Input Field and executes the handler function.
 It is fired when the input field is modified and loses focus. It is one of the form events that updates when the input field is modified. */}
    
 
        </div>
       
      </div>
    </div>
  )
}

export default SearchBar
