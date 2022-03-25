const routes = require('express').Router()
const { getPostings, createPosting, deletePosting, updatePosting } = require('../controllers/postingsController')

routes.get('/', getPostings)
routes.post('/', createPosting)
routes.delete('/:id', deletePosting)
routes.patch('/:id', updatePosting)

module.exports = routes