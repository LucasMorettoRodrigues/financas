export type TPosting = {
    id: string,
    description: string,
    category: string,
    date: Date,
    value: number,
    type: string,
    account_id: string,
    user_id: string
    from_account_id?: string
}

export type TPosting1 = {
    id: string,
    description: string,
    category: string,
    date: string,
    value: number,
    type: string,
    account_id: string,
    user_id: string,
    from_account_id?: string
}