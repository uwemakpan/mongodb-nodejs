// import the Person model to perform various operations on the model data
const Person = require('../models/person.model')

// controller to create new person
const createNewPerson = (req, res) => {
  // accept person data from client
  const { name, email, age, favoriteFoods, nationality, isVerified } = req.body

  try {
    // create an object of a Person using data from the client
    const newPerson = new Person({
      name,
      email,
      age,
      favoriteFoods,
      nationality,
      isVerified,
    })

    // save the new person to the db
    const result = newPerson.save()

    // guard condition if creation failed
    if (!result) {
      throw new Error('Error creating person 🛑')
    }

    // success response on successful creation of Person object and saving to db
    return res
      .status(201)
      .json({ message: 'New Person created successfully ✅', data: newPerson })
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Person creation failed. Contact Admin ⚠️',
    })
  }
}

// return all users in the db
const getAllPersons = async (req, res) => {
  try {
    // find methood of Person model returns all records in the db
    const persons = await Person.find()

    // guard condition if find operation failed
    if (!persons) {
      res.status(400).json({ message: 'Could not get persons ❌' })
    }

    // success response after successful retireval of Person records from db
    return res
      .status(200)
      .json({ message: 'All registered persons✔️', persons })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// find person by id
const getPersonById = async (req, res) => {
  // obtain Person id from the request params object
  const { _id } = req.params
  try {
    // findById method to obtain person with _id
    const person = await Person.findById(_id)

    // guard condition
    if (!person) {
      return res.status(400).json({ message: 'Person not found ⚠️' })
    }

    // success response on finding Person with _id
    return res.status(200).json({ message: 'Person found ✔️', person })
  } catch (error) {
    res.status(403).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// find persons with a given name
const getPersonsByName = async (req, res) => {
  // obtain the name of the Person to find from the params property of the request object
  const { name } = req.params
  try {
    // use the find method with the name as argument to find Person object with 'name'
    const persons = await Person.find({ name })

    // guard condition if person cannot be retrieved
    if (!persons) {
      return res
        .status(400)
        .json({ message: 'Person with name does not exist ⚠️' })
    }

    // success response on finding the person with name
    return res.status(200).json({ message: 'Persons found ✔️', persons })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// get person who has this food in its favorite foods list
const getPersonByFood = async (req, res) => {
  // obtain the food from the params property of the request object
  const { food } = req.params

  try {
    // retrieves all users with food in their favorites list
    const person = (await Person.find()).filter((person) =>
      person.favoriteFoods.includes(food)
    )[0]

    // guard condition
    if (!person) {
      return res.status(403).json({ message: 'No person with this food ⚠️' })
    }

    // success message on successful retrieval
    return res
      .status(200)
      .json({ message: `Person with ${food} found ✔️`, person })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// function to add new food to the favorites list of a person using his id
const addFoodByPersonId = async (req, res) => {
  const { _id } = req.params // obtain id from the params object
  const { food } = req.body // obtain food from the request body
  try {
    // get person with _id
    const person = await Person.findById(_id) // obtain person with the _id provided

    // add food to the list of favorite foods for the person
    person?.favoriteFoods.push(food) // add food to the favorites list of the person

    // save the result to the db
    const result = await person.save()

    // guard condition
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Food was not added to favorite foods ⚠️' })
    }

    // success response after adding to favorites list and saving to db
    return res
      .status(200)
      .json({ message: 'Food added to favorite list ✔️', person })
  } catch (error) {
    res.status(403).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// update age of person by using person name
const updateAgeByName = async (req, res) => {
  const { name } = req.params // obtain the name from the params property of request object
  const { age } = req.body // obtain age from the boy

  // arguments to be provided to findOneAndUpdate
  const query = { name }
  const update = { age }
  const options = { new: true }

  try {
    // use findOneAndUpdate to update person's age given his name in the query
    const persons = await Person.findOneAndUpdate(query, update, options)

    // await persons.save()

    // guard condition
    if (!persons) {
      return res.status(400).json({ message: 'Unable to update person age ⚠️' })
    }

    // success response
    return res.status(200).json({ message: 'Persons age updated ✔️', persons })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// delete a person using his personid
// findByIdAndDelete
const deletePersonById = async (req, res) => {
  const { _id } = req.params
  try {
    // perform delete using findByIdAndDelete using the _id provided
    const result = await Person.findByIdAndDelete(_id)

    //  guard condition
    if (!result) {
      return res.status(403).json({ message: 'Delete operation failed ❌' })
    }

    return res
      .status(200)
      .json({ message: 'Person deleted successfuly ✔️', result })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// delete persons with a specific name
const deletePersonsByName = async (req, res) => {
  const { name } = req.params
  try {
    const result = await Person.deleteMany({ name })

    if (!result) {
      return res.status(403).json({ message: 'Error deleting persons ❌' })
    }

    return res
      .status(200)
      .json({ message: 'Persons deleted successfully ✅', result })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// get users who like specific food
// find(), .sort(), .limit(), .select(), and then .exec()
const getPersonsByFavoriteFood = async (req, res) => {
  const { food } = req.params

  try {
    let result = await Person.find() // Find users with age greater than or equal to 18
      .sort({ name: 1 })
      .limit(2) // Limit the result to 2 persons
      .select('name email nationality isVerified favoriteFoods') // Only include name email nationality isVerified favoriteFoods fields

    // return all those with the specified food using the includes method of the object array favoriteFoods
    const output = result.filter((obj) => obj.favoriteFoods.includes(food))

    // guard condition
    if (!result) {
      return res.status(403).json({ message: 'Records cannot be spooled ⚠️' })
    }

    // success response after obtaining data
    return res.status(200).json({ message: 'Records returned ✅', output })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// export all confrollers
module.exports = {
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
}
