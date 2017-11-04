'use strict'

const post = require('./')

module.exports = router => {

  // Delete posts by id (not HN objectID)
  router.delete('/:id', async (req, res) => {
    const { params: { id } } = req
  
    try {
      const deleted = await post.deletePost(id)

      res.json({
        success: true,
        response: { deleted }
      })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
