console.log('Client side JavaScript file is loaded')            // In the browser console 

const weatherform = document.querySelector('form')              // Selecting the weather form
const search = document.querySelector('input')                  // Selecting the search input
const messageOne = document.querySelector('#message-1')         // Selecting the first message element
const messageTwo = document.querySelector('#message-2')         // Selecting the second message element

weatherform.addEventListener('submit', (e) => {                 // Adding event listener for form submission
    e.preventDefault()                                          // Preventing default form submission behavior

    const location = search.value                               // Getting the location value from the search input

    messageOne.textContent = 'Loading...'                       // Updating the first message element
    messageTwo.textContent = ''                                 // Clearing the second message element

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {     // Fetching weather data from the server
        response.json().then((data) => {                                                // Parsing the JSON response
            if (data.error) {                                                           // Checking for errors in the response
                messageOne.textContent = 'Error: ' + data.error                         // Displaying error message
            } else {                                                                    // Otherwise
                messageOne.textContent = data.location                                  // Displaying location
                messageTwo.textContent = data.forecast                                  // Displaying forecast
            }
        })
    })
})
