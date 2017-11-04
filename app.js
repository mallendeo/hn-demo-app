'use strict'

const express = require('express')
const pug = require('pug')
const app = express()
const mongoose = require('mongoose')

const hn = require('./lib/hn')
const post = require('./components/post')
const postRouter = require('./components/post/router')

const {
  PORT = 3000,
  MONGO_DB_PORT = 27017,
  MOCK_DATA = false,
  MONGO_DB_URL = `mongodb://localhost:${MONGO_DB_PORT}`
} = process.env

// Mongoose connection
mongoose.Promise = Promise
mongoose.connect(MONGO_DB_URL, { useMongoClient: true })

const db = mongoose.connection
db.on('error', e => console.error(`Connection error: ${e}`))

// HN background daemon
;(async () => {
  const min = n => n * 60000

  async function retrieveAndSavePosts () {
    try {
      const posts = await hn.getPosts({
        storiesOnly: true,
        useMockData: MOCK_DATA
      })

      await post.insertPosts(posts)
    } catch (e) {
      console.error(`HN daemon error: ${e.message}`)
    }
  }
  
  retrieveAndSavePosts()
  setInterval(retrieveAndSavePosts, min(60))
})()

app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

const router = new express.Router()

// Inject post router
postRouter(router)

app.use('/posts', router)

app.get('/', async (req, res) => {
  res.render('index.pug', {
    posts: await post.getPosts()
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
