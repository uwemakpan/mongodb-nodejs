const { dbconnect } = require('./helpers/dbconfig')
const app = require('./app')

const http = require('http') // confiture http to handle routing
const httpServer = http.createServer(app)
const { PORT } = require('./lib/index')

// method to start app
const startApp = async () => {
  // Connect to db
  await dbconnect()

  // lister to server at PORT
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 💪`)
  })
}

// start the applicatoin
startApp()
