const Account = require('../models/Account')

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll()
        return res.status(200).json(accounts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createAccount = async (req, res) => {

    const { name, type, balance } = req.body

    if (!name | !type | !balance) {
        return res.status(500).json({ error: 'missing fields.' })
    }

    try {
        const newAccount = await Account.create({
            name, type, balance, user_id: 1
        })

        return res.status(200).json(newAccount)

    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getAllAccounts,
    createAccount
}