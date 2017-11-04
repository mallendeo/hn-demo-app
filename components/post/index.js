'use strict'

const Post = require('./model')

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
  await Post.update({ _id: id }, { $set: { deleted: true }})
}

module.exports = {
  insertPosts,
  deletePost
}
