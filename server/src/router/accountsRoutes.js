const routes = require('express').Router()
const { getAllAccounts,
    createAccount,
    deleteAccount,
    updateAccount } = require('../controllers/accountsController')

routes.get('/', getAllAccounts)
routes.post('/', createAccount)
routes.delete('/:id', deleteAccount)
routes.patch('/:id', updateAccount)

module.exports = routes