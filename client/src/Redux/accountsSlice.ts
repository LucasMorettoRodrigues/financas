import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAccount } from '../Types/taccount'
import { accounts } from '../Data/accounts'

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: accounts
    },
    reducers: {
        addAccount: (state, action: PayloadAction<TAccount>) => {
            state.accounts = [...state.accounts, action.payload]
        },
        refreshBalance: (state, action) => {
            state.accounts = state.accounts.map((account) => (account.id === action.payload.account_id
                ? Object.assign({}, account, { balance: account.balance + action.payload.value })
                : account
            ))
        },
        editAccount: (state, action: PayloadAction<TAccount>) => {
            state.accounts = state.accounts.map((account) => (account.id === action.payload.id
                ? action.payload
                : account
            ))
        }
    }
})

export const { addAccount, refreshBalance, editAccount } = accountSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default accountSlice.reducer