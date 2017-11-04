'use strict'

const Post = require('./model')
const moment = require('moment')

async function getPosts (limit = 20) {
  const posts = await Post
    .find({})
    .limit(limit)
    .sort({ created_at: -1 })
    .where('deleted').ne(true)
    .lean()

  return posts.map(post => ({
    ...post,
    fromNow: moment(post.created_at).fromNow()
  }))
}

async function insertPosts (posts) {
  const [last] = await Post.find({}).sort({ objectID: -1 }).limit(1)

  // Since we are retrieving posts by date, we can check
  // if new posts have greater ids
  const latestPosts = posts.filter(post => {
    if (!last) return true
    return +post.objectID > +last.objectID
  })

  if (!latestPosts.length) return false
  
  await Post.insertMany(latestPosts)
}

async function deletePost (id) {
  // Mark it as deleted instead of actually removing it
  return Post.update({ _id: id }, { $set: { deleted: true }})
}

module.exports = {
  getPosts,
  insertPosts,
  deletePost
}