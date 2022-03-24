const Category = require('../models/Category')
const Posting = require('../models/Posting')
const Sequelize = require('sequelize')

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
                'account_id',
                'user_id',
                [Sequelize.literal('"category"."name"'), 'category']
            ],
            raw: true
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

        const newPostings = await Posting.create({
            description: description,
            type: type,
            date: date,
            value: value,
            category_id: category_id,
            account_id: account_id,
            user_id: 1
        })

        res.status(200).json(newPostings)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getPostings,
    createPosting
}