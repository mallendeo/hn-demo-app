'use strict'

const express = require('express')
const pug = require('pug')
const app = express()
const mongoose = require('mongoose')

const hn = require('./lib/hn')

const {
  PORT = 3000,
  MONGO_DB_PORT = 27017,
  MONGO_DB_URL = `mongodb://localhost:${MONGO_DB_PORT}`
} = process.env

mongoose.Promise = Promise
mongoose.connect(MONGO_DB_URL, { useMongoClient: true })
const db = mongoose.connection

// HN background daemon
;(async () => {
  const min = n => n * 60000

  async function retrieveAndSavePosts () {
    try {
      const posts = await hn.getPosts()
    } catch (e) {
      console.error(`There was an error retrieving the posts.`)
    }
  }
  
  retrieveAndSavePosts()
  setInterval(retrieveAndSavePosts, min(60))
})()

app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('index.pug')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
