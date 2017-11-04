'use strict'

const axios = require('axios')

const HOST = 'https://hn.algolia.com/api/v1'

const getPosts = async (query = 'nodejs') => {

  const { data } = await axios(`${HOST}/search_by_date?query=${query}`)

  const { hits: posts } = data
  
  return posts
    .filter(post => (post.title || post.story_title))
    .map(post => ({
      title: post.story_title || post.title,
      author: post.author,
      url: post.story_url || post.url,
      objectID: post.objectID,
      created_at: post.created_at
    }))
}

module.exports = {
  getPosts
}
