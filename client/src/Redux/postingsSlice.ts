import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPosting1 } from '../Types/tposting'
import { postings } from '../Data/postings'

export const postingSlice = createSlice({
    name: 'posting',
    initialState: {
        postings: postings
    },
    reducers: {
        addPosting: (state, action: PayloadAction<TPosting1>) => {
            state.postings = [...state.postings, action.payload]
        },
        editPosting: (state, action: PayloadAction<TPosting1>) => {
            state.postings =
                action.payload.type === 'Transferency'
                    ? state.postings.map((item) => (item.id === action.payload.id && item.category === action.payload.category
                        ? action.payload
                        : item
                    ))
                    : state.postings.map((item) => (item.id === action.payload.id
                        ? action.payload
                        : item
                    ))
        },
        deletePostingById: (state, action: PayloadAction<string>) => {
            state.postings = state.postings.filter((item) => item.id !== action.payload)
        },
        deletePostingsByAccountId: (state, action: PayloadAction<string>) => {
            state.postings = state.postings.filter((item) => item.account_id !== action.payload)
        }
    }
})

export const { addPosting, editPosting, deletePostingById, deletePostingsByAccountId } = postingSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default postingSlice.reducer