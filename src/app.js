const express = require('express') // import express
const app = express() // call the express function to run the app
const cors = require('cors')

// import the person route to the app
const personRoutes = require('./routes/person.routes')

// configure app to implemenet the cors policy
app.use(cors({ origin: '*', credentials: true }))

// allows acceptance of json data from client
app.use(express.json())

// main/root route for all person routes
app.use('/persons', personRoutes)

module.exports = app
