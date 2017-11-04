'use strict'

const express = require('express')
const pug = require('pug')
const app = express()
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env

app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('index.pug')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
