export type TPosting = {
    id: number,
    description: string,
    category: string,
    date: Date,
    value: number,
    type: string,
    account_id: number,
    user_id: number
    from_account_id?: number,
    category_id: number
}

export type TPosting1 = {
    id: number,
    description: string,
    category: string,
    date: string,
    value: number,
    type: string,
    account_id: number,
    user_id: number,
    from_account_id?: number
    category_id: number
}