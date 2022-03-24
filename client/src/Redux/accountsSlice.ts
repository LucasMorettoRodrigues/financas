import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAccount } from '../Types/taccount'
import axios from 'axios'

export const getAccounts = createAsyncThunk(
    'accounts/getAccounts',
    async () => {
        const data = await axios.get('http://localhost:5000/api/v1/accounts')
        const accounts = data.data.map((acc: { balance: string }) => (Object.assign({}, acc, { balance: parseFloat(acc.balance) })))
        return accounts
    }
)

type State = {
    accounts: TAccount[],
    status: string | null
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: [],
        status: null
    } as State,
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
        },
        deleteAccountById: (state, action: PayloadAction<number>) => {
            state.accounts = state.accounts.filter((account) => account.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccounts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAccounts.fulfilled, (state, action) => {
            state.status = 'success'
            state.accounts = action.payload
        })
        builder.addCase(getAccounts.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export const { addAccount, refreshBalance, editAccount, deleteAccountById } = accountSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default accountSlice.reducer