// Create a person with this prototype:

// - Person Prototype -

// --------------------

// name: string [required]
// age: number
// favoriteFoods: array of strings (*)
// email
// nationality
// isVerified

// import mongoose and specify
// that a schema is to be created from mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema(
  {
    // Property 1
    name: {
      type: String,
      required: true,
    },

    // Property 2
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },

    // Property 3
    age: Number,

    // Property 4
    favoriteFoods: [
      {
        type: String,
        required: true,
      },
    ],

    // Property 5
    nationality: {
      type: String,
      required: true,
    },

    // Property 6
    isVerified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true } // timestamp to automatically include the createdAt and UpdatedAt properties
)

const Person = mongoose.model('person', personSchema)

module.exports = Person
