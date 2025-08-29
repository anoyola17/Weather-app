const request = require('request')      // Importing request module

const geocode = (address, callback) => {    // Geocode function: provides latitude, longitude, and location name
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiYW5veW9sYTE3IiwiYSI6ImNtZXI1ZXJidzAzMjEybHEzOGt4amlocm4ifQ.RJ_0vPfRZoikl4VKIfxopQ&limit=1'  // Mapbox Geocoding API URL
    
    request({ url, json:true}, (error, {body}) => {                                 // Making a request to the Mapbox Geocoding API
        if (error) {                                                                // Handling request errors  
            callback('Unable to connect to location services!', undefined)          // Display Network error
        } else if (body.features.length === 0) {                                    // If no location is found based on the search 
            callback('Unable to find location. Try another search.', undefined)     // Display location not found error
        } else {                                                                    // Otherwise    
            callback(undefined, {                                                   // Providing the geocoding data         
                latitude: body.features[0].geometry.coordinates[1],                 // Displaying latitude (destructured object)
                longitude: body.features[0].geometry.coordinates[0],                // Displaying longitude (destructured object)
                location: body.features[0].properties.full_address                  // Displaying location name (destructured object)
            })
        }
    })

}

module.exports = geocode        // Exporting the geocode function
