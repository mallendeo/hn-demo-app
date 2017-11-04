'use strict'

const express = require('express')
const pug = require('pug')
const app = express()
const mongoose = require('mongoose')

const {
  PORT = 3000,
  MONGO_DB_PORT = 27017,
  MONGO_DB_URL = `mongodb://localhost:${MONGO_DB_PORT}`
} = process.env

mongoose.Promise = Promise
mongoose.connect(MONGO_DB_URL, { useMongoClient: true })
const db = mongoose.connection

app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('index.pug')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
