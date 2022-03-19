export const postings = [
    {
        id: "0001",
        description: "Burger King",
        category: "alimentação",
        date: new Date(2022, 3, 1),
        value: 60,
        type: "expense",
        account_id: "0001",
        user_id: "0001"
    },
    {
        id: "0002",
        description: "Salário",
        category: "salário",
        date: new Date(2022, 3, 19),
        value: 4000,
        type: "income",
        account_id: "0001",
        user_id: "0001"
    },
    {
        id: "0003",
        description: "Pizza",
        category: "alimentação",
        date: new Date(2022, 4, 20),
        value: 80,
        type: "expense",
        account_id: "0002",
        user_id: "0001"
    }
]