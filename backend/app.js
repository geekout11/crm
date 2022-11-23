const config = require('./config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`


mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch((err) => {
    throw err
  })

const app = express()
app.use(express.json()) //express.json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.
app.use(cors())

const eventRoutes = require('./app/routes/EventsRoutes')()
app.use('/api', eventRoutes)
app.use('/', eventRoutes)
app.use('/', eventRoutes)


app.listen(config.app.port, () => {
  console.log('⚡️ Express server is up! ⚡️ happy hacking ;)')
})