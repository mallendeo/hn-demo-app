'use strict'

const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  objectID: { type: Number, unique: true },
  created_at: Date,
  deleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('Post', postSchema)
