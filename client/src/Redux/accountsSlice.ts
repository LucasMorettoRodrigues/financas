import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAccount } from '../Types/taccount'
import { accounts } from '../Data/accounts'

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: accounts
    },
    reducers: {
        // decrement: state => {
        //     state.value -= 1
        // },
        // Use the PayloadAction type to declare the contents of `action.payload`
        addAccount: (state, action: PayloadAction<TAccount>) => {
            state.accounts = [...state.accounts, action.payload]
        }
    }
})

export const { addAccount } = accountSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default accountSlice.reducer