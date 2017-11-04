'use strict'

const axios = require('axios')
const mockData = require('./mock.json')

const HOST = `https://hn.algolia.com/api/v1`
const PRODUCTION = process.env.NODE_ENV === 'production'

const getPosts = async (query = 'nodejs') => {
  if (!PRODUCTION) console.log('HN: Using mock data.')

  const { data } = PRODUCTION
    ? await axios(`${HOST}/search_by_date?query=${query}`)
    : { data: mockData }

  const { hits: posts } = data
  
  const payload = posts
    .filter(post => (post.title || post.story_title))
    .map(post => ({
      title: post.story_title || post.title,
      author: post.author,
      url: post.story_url || post.url,
      objectID: post.objectID,
      created_at: post.created_at
    }))

  return payload
}

module.exports = {
  getPosts
}
