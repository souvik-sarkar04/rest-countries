import React from 'react'

const Notes = () => {
  return (
    <div>
       {/* 
       Unreliable Borders Handling:
The original code didn't check if data.borders was defined or an array before attempting to map over it.
If data.borders was undefined or not an array, it would throw an error when attempting to map over it, leading to the "Country not found" message.
Changes Made
Initialization of Borders:

javascript
Copy code
let borders = [];
Initialize borders as an empty array. This ensures that even if there are no borders, the rest of the code can still execute without issues.
Check for Existence and Type:

javascript
Copy code
if (data.borders && Array.isArray(data.borders)) {
This check ensures that data.borders exists and is an array. This prevents errors when attempting to map over an undefined or non-array value.
Fetching Border Countries:

javascript
Copy code
borders = await Promise.all(
  data.borders.map((border) =>
    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => borderCountry.name.common)
  )
);
Promise.all is used to handle multiple asynchronous fetch requests concurrently. It waits for all fetch requests to complete before proceeding.
data.borders.map((border) => fetch(...)) creates an array of promises, each fetching data for a border country.
.then(([borderCountry]) => borderCountry.name.common) extracts the common name of each border country from the fetched data.
await Promise.all(...) ensures that all fetch requests complete and their results are gathered into the borders array.
Why These Changes Are Important
Error Prevention:

By checking data.borders and ensuring it's an array, the code avoids potential runtime errors that could occur when trying to map over an undefined or non-array value.
Asynchronous Handling:

Using Promise.all ensures that all border fetches complete before updating the state. This is crucial for maintaining consistency and avoiding incomplete or incorrect data rendering.
Correct State Update:

The results of the border fetches are correctly processed and stored in the borders array, which is then used to update the component state. This ensures that the border countries are displayed correctly.
       */}
    </div>
  )
}

export default Notes
