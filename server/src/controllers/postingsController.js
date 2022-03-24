const Posting = require('../models/Posting')

const getPostings = async (req, res) => {
    try {
        const postings = await Posting.findAll()
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