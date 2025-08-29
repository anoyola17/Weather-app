const path = require('path');                       // Importing Path module
const express = require('express');                 // Importing Express module
const hbs = require('hbs');                         // Importing Hbs module
const geocode = require('./utils/geocode');         // Importing Geocode module 
const forecast = require('./utils/forecast');       // Importing Forecast module 

const app = express();                              // Creating Express application

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')           // Path to public directory
const viewsPath = path.join(__dirname, '../templates/views')            // Path to views directory
const partialsPath = path.join(__dirname, '../templates/partials')      // Path to partials directory

// Setup handlebars engine and view location
app.set('view engine', 'hbs')                     // Setting view engine to hbs
app.set('views', viewsPath)                       // Setting views directory
hbs.registerPartials(partialsPath)                // This allows partials to be registered

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))        // Serving static files from public directory

app.get('', (req, res) =>{                          // Index page endpoint (root)
    res.render('index', {                           // Rendering index template
        title: 'Weather',                           // Displaying the title
        name: 'Ana Noyola'                          // Displaying the name
    })
})

app.get('/about', (req, res) =>{                    // About page endpoint
    res.render('about', {                           // Rendering about template
        title: 'About',                             // Displaying the title
        name: 'Ana Noyola'                          // Displaying the name
    })
})

app.get('/help', (req, res) =>{                      // Help page endpoint
    res.render('help', {                             // Rendering help template
        helpText: 'This is the help page.',          // Displaying the help text
        title: 'Help',                               // Displaying the title
        name: 'Ana Noyola'                           // Displaying the name
    })
})

app.get('/weather', (req, res) => {                  // Weather endpoint
    if (!req.query.address) {                        // If no query parameter is provided (it doesn't exist)
        return res.send({                            // Sending error response
            error: 'You must provide an address'     // Displaying error message
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {     // This handles the geocoding data and its errors (destructuring with default empty object)
        if (error) {                                                                    // If geocoding fails
            return res.send({error})                                                    // Sending error response
        }

        forecast(latitude, longitude, (error, forecastData) => {                        // This handles the forecast data and its errors
            if (error) {                                                                // If forecast fails
                return res.send({ error })                                              // Sending error response
            }

        res.send({                                                                      // Sending successful response
            forecast: forecastData,                                                     // Displaying forecast data
            location,                                                                   // Displaying location
            address: req.query.address                                                  // Displaying address provided in the query
            })
        })
    })
})

app.get('/products', (req, res) => {                                      // Products endpoint
    if(!req.query.search){                                                // If no search term is provided (it doesn't exist)
        return res.send({                                                 // Sending error response
            error: 'You must provide a search term'                       // Displaying error message
        })
    }

    console.log(req.query.search)                                         // In the console, log the search term
    res.send({                                                            // Sending successful response
        products: []                                                      // Displaying products array
    })
})

app.get(/.*help.*/, (req, res) => {                                     // Help article endpoint (any wildcard beyond /help)
  res.render('404', {                                                   // Rendering 404 template
    title: '404',                                                       // Displaying title
    name: 'Ana Noyola',                                                 // Displaying name
    errorMessage: 'Help article not found'                              // Displaying error message
  });
});

app.get(/.*/, (req, res) => {                                           // 404 endpoint (any wildcard start)
  res.render('404', {                                                   // Rendering 404 template
    title: '404',                                                       // Displaying title
    name: 'Ana Noyola',                                                 // Displaying name
    errorMessage: 'Page not found'                                      // Displaying error message
  });
});

app.listen(3000, () => {                                                // Starting the server on port 3000 (listening)
    console.log('Server is up on port 3000.')                           // Logging server status
})