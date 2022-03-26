const postings = [
    {
        description: "Burger King",
        category_id: 1,
        date: new Date().toISOString(),
        value: -60.00,
        type: "Expense",
        account_id: 1,
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        description: "Salário",
        category_id: 2,
        date: new Date().toISOString(),
        value: 4000.00,
        type: "Income",
        account_id: 1,
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        description: "Pizza",
        category_id: 3,
        date: new Date().toISOString(),
        value: -80.00,
        type: "Expense",
        account_id: 2,
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        description: "Etanol",
        category_id: 4,
        date: new Date().toISOString(),
        value: -100.00,
        type: "Expense",
        account_id: 2,
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        description: "Celular",
        category_id: 5,
        date: new Date().toISOString(),
        value: -40.00,
        type: "Expense",
        account_id: 1,
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
]

module.exports = postings