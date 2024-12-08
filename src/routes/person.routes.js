const express = require('express') // import the express module to handle routing

// import all confrollers that would be called using the routes
const {
  createNewPerson,
  getPersonById,
  getAllPersons,
  getPersonsByName,
  getPersonByFood,
  addFoodByPersonId,
  updateAgeByName,
  deletePersonById,
  deletePersonsByName,
  getPersonsByFavoriteFood,
} = require('../controllers/person.controllers')
const personRoutes = express.Router() // specify that the route used is the Router method from express

// route to return all persons in the db
personRoutes.get('/', getAllPersons)

// route to get person with a certain food
personRoutes.get('/food/:food', getPersonByFood)

// route to get persons with a specific name
personRoutes.get('/name/:name', getPersonsByName)

// route to get person by id
personRoutes.get('/:_id', getPersonById)

// route to create new person
personRoutes.post('/create', createNewPerson)

// route to add food to favorites array of a person
personRoutes.patch('/food/add/:_id', addFoodByPersonId)

// route to update the age of a person
personRoutes.patch('/age/:name', updateAgeByName)

// route to delete a person by id
personRoutes.delete('/delete/:_id', deletePersonById)

// route to delete persons with a specific name
personRoutes.delete('/delete/name/:name', deletePersonsByName)

// route to get users who like certain food
personRoutes.get('/likes/:food', getPersonsByFavoriteFood)

module.exports = personRoutes
