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
        }
    }
})

export const { addPosting } = postingSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default postingSlice.reducer