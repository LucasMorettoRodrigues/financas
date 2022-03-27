const Account = require('../models/Account')
const Posting = require('../models/Posting')

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({ order: [['id', 'ASC']] })
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

const updateAccount = async (req, res) => {

    try {
        const account = await Account.findByPk(req.params.id)

        if (!account) return res.status(404).json({ error: 'account not found.' })

        const { name, type, balance } = req.body
        if (!name && !type && !balance) return res.status(500).json({ error: 'missing params.' })

        if (name) account.name = name
        if (type) account.type = type
        if (balance) account.balance = balance

        account.save()

        return res.status(200).json(account)
    } catch (error) {
        return res.status(500).json({ success: 'error' })
    }
}

const deleteAccount = async (req, res) => {

    try {
        const account = await Account.findByPk(req.params.id)

        if (!account) {
            return res.status(404).json({ error: 'account not found.' })
        }

        const postings = await Posting.findAll({ where: { account_id: account.id } })
        if (postings.length > 0) postings.map(posting => posting.destroy())

        account.destroy()

        return res.status(200).json({ success: 'account deleted.' })
    } catch (error) {
        return res.status(500).json({ success: 'error' })
    }
}

module.exports = {
    getAllAccounts,
    createAccount,
    deleteAccount,
    updateAccount
}