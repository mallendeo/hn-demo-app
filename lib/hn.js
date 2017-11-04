'use strict'

const axios = require('axios')
const mockData = require('./mock.json')

const HOST = `https://hn.algolia.com/api/v1`

const getPosts = async ({
  query = 'nodejs',
  storiesOnly = false,
  useMockData = false
}) => {
  if (useMockData) console.log('HN: Using mock data.')
  
  // Check whether includes comments or show only stories
  const qs = `query=${query}${storiesOnly ? '&tags=story' : ''}`

  const { data } = useMockData
    ? { data: mockData }
    : await axios(`${HOST}/search_by_date?${qs}`)

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
