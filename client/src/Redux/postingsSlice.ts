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
            state.postings = state.postings.map((item) => (item.id === action.payload.id
                ? action.payload
                : item
            ))
        }
    }
})

export const { addPosting, editPosting } = postingSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default postingSlice.reducer