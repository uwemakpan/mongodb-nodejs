const { MONGO_URI } = require('../lib/index') // import database URO
const mongoose = require('mongoose') // import mongoose ODM

// Function to connect to db
const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Database connected successfully ✅')
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = { dbconnect }
