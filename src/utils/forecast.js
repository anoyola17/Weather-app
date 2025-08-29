const request = require('request')              // Importing request module

const forecast = (latitude, longitude, callback) => {                   // Forecast function: provides weather information
    const url = 'https://api.weatherstack.com/current?access_key=def51b8b077f80250eb39ec32328a3f6&query=' + latitude + ',' + longitude + '&units=f'     // Weather API URL

    request({ url, json: true }, (error, { body }) => {                     // Making a request to the Weather API
        if (error) {                                                        // Handling request errors
            callback('Unable to connect to weather service!', undefined)    // Display Network error
        } else if (body.error) {                                            // Handling API errors
            callback('Unable to find location', undefined)                  // Display location not found error
        } else {                                                            // Otherwise
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')   // Display weather information
        }
    })
}

module.exports = forecast       // Exporting the forecast function
