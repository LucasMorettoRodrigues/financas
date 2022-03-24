const routes = require('express').Router()
const { getPostings, createPosting } = require('../controllers/postingsController')

routes.get('/', getPostings)
routes.post('/', createPosting)

module.exports = routes