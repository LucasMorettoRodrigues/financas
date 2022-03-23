const { getAllAccounts, createAccount } = require('../controllers/accountsController')
const routes = require('express').Router()

routes.get('/', getAllAccounts)
routes.post('/', createAccount)

module.exports = routes