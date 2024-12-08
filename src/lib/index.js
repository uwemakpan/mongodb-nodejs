// function to configure environment variables which include
// the db URI and the PORT
require('dotenv').config()

module.exports = { MONGO_URI: process.env.MONGO_URI, PORT: process.env.PORT }
