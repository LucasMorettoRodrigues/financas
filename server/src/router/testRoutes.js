const routes = require('express').Router()

routes.get('/test', (req, res) => {
    res.json({ test: "successfull" })
})

module.exports = routes