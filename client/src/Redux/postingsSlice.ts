import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPosting1 } from '../Types/tposting'
import axios from 'axios'

export const getPostings = createAsyncThunk(
    'postings/getPostings',
    async () => {
        const data = await axios.get('http://localhost:5000/api/v1/accounts')
        const postings = data.data.map((pos: { date: string }) => (Object.assign({}, pos, { date: pos.date.substring(0, 10) })))
        return postings
    }
)

type State = {
    postings: TPosting1[],
    status: string | null
}

export const postingSlice = createSlice({
    name: 'postings',
    initialState: {
        postings: [],
        status: null
    } as State,
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
        deletePostingById: (state, action: PayloadAction<number>) => {
            state.postings = state.postings.filter((item) => item.id !== action.payload)
        },
        deletePostingsByAccountId: (state, action: PayloadAction<number>) => {
            state.postings = state.postings.filter((item) => item.account_id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPostings.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getPostings.fulfilled, (state, action) => {
            state.status = 'success'
            state.postings = action.payload
        })
        builder.addCase(getPostings.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export const { addPosting, editPosting, deletePostingById, deletePostingsByAccountId } = postingSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default postingSlice.reducer