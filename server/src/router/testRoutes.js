const routes = require('express').Router()
const Category = require('../models/Category')

routes.get('/test', (req, res) => {
    return res.json({ test: "successfull" })
})

routes.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.json(category)
    } catch (error) {
        return res.json(error)
    }
})

module.exports = routes