import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TAccount } from '../Types/taccount'
import axios from 'axios'
import { getPostings } from './postingsSlice'

export const getAccounts = createAsyncThunk(
    'accounts/getAccounts',
    async () => {
        const data = await axios.get('https://financas--api.herokuapp.com/api/v1/accounts')
        const accounts = data.data.map((acc: { balance: string }) => (Object.assign({}, acc, { balance: parseFloat(acc.balance) })))
        return accounts
    }
)

export const addAccount = createAsyncThunk(
    'accounts/addAccounts',
    async (newAccount: TAccount, thunkAPI) => {
        await axios.post('https://financas--api.herokuapp.com/api/v1/accounts', newAccount)
        thunkAPI.dispatch(getAccounts())
    }
)

export const deleteAccountById = createAsyncThunk(
    'accounts/deleteAccounts',
    async (accountId: number, thunkAPI) => {
        await axios.delete(`https://financas--api.herokuapp.com/api/v1/accounts/${accountId}`)
        thunkAPI.dispatch(getAccounts())
        thunkAPI.dispatch(getPostings())
    }
)

export const editAccount = createAsyncThunk(
    'accounts/editAccounts',
    async (account: TAccount, thunkAPI) => {
        await axios.patch(`https://financas--api.herokuapp.com/api/v1/accounts/${account.id}`, account)
        thunkAPI.dispatch(getAccounts())
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

export default accountSlice.reducer