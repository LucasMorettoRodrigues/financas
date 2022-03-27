const Sequelize = require('sequelize')
const Posting = require('../models/Posting')
const Account = require('../models/Account')
const Category = require('../models/Category')

const getPostings = async (req, res) => {
    try {
        Posting.belongsTo(Category, { foreignKey: 'category_id' })

        const postings = await Posting.findAll({
            include: [{
                model: Category,
                attributes: []
            }],
            attributes: [
                'id',
                'description',
                'date',
                'type',
                'value',
                'category_id',
                'account_id',
                'user_id',
                [Sequelize.literal('"category"."name"'), 'category']
            ],
            raw: true,
            order: [['date', 'ASC']]
        })

        res.status(200).json(postings)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createPosting = async (req, res) => {
    try {
        const { description, type, date, value, category_id, account_id } = req.body

        if (!description | !type | !date | !value | !category_id | !account_id) {
            res.status(500).json({ error: "missing fields." })
        }

        const newPosting = await Posting.create({
            description: description,
            type: type,
            date: date,
            value: value,
            category_id: category_id,
            account_id: account_id,
            user_id: 1
        })

        const account = await Account.findByPk(newPosting.account_id)
        account.balance = Math.round((parseFloat(account.balance) + parseFloat(newPosting.value)) * 100) / 100
        account.save()

        res.status(200).json(newPosting)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updatePosting = async (req, res) => {

    try {
        const posting = await Posting.findByPk(req.params.id)

        if (!posting) return res.status(404).json({ error: 'account not found.' })

        const { description, category_id, date, value, account_id } = req.body

        if (!description && !category_id && !date && !value && !account_id) {
            return res.status(500).json({ error: 'missing params.' })
        }

        console.log(category_id);
        if (description) posting.description = description
        if (category_id) posting.category_id = category_id
        if (date) posting.date = date

        if (value || account_id) {
            const formerAccount = await Account.findByPk(posting.account_id)
            formerAccount.balance = Math.round((parseFloat(formerAccount.balance) - parseFloat(posting.value)) * 100) / 100

            formerAccount.save()

            currentAccount = account_id === posting.account_id
                ? formerAccount
                : await Account.findByPk(account_id)

            currentAccount.balance = Math.round((parseFloat(currentAccount.balance) + parseFloat(value ? value : posting.value)) * 100) / 100

            currentAccount.save()
        }

        if (value) posting.value = value
        if (account_id) posting.account_id = account_id

        posting.save()

        return res.status(200).json(posting)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deletePosting = async (req, res) => {

    try {
        const posting = await Posting.findByPk(req.params.id)

        if (!posting) {
            return res.status(404).json({ error: 'account not found.' })
        }

        const account = await Account.findByPk(posting.account_id)
        account.balance = Math.round((parseFloat(account.balance) - parseFloat(posting.value)) * 100) / 100
        account.save()

        posting.destroy()

        return res.status(200).json({ success: 'posting deleted.' })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getPostings,
    createPosting,
    deletePosting,
    updatePosting
}