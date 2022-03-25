import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TPosting1 } from '../Types/tposting'
import axios from 'axios'
import { getAccounts } from './accountsSlice'

export const getPostings = createAsyncThunk(
    'postings/getPostings',
    async () => {
        const data = await axios.get('http://localhost:5000/api/v1/postings')
        const postings = data.data
            .map((pos: { date: string, value: string }) =>
            (Object.assign(
                {},
                pos,
                { date: pos.date.substring(0, 10), value: parseFloat(pos.value) })))
        return postings
    }
)

export const addPosting = createAsyncThunk(
    'postings/addPosting',
    async (newPosting: TPosting1, thunkAPI) => {
        await axios.post('http://localhost:5000/api/v1/postings', newPosting)
        thunkAPI.dispatch(getAccounts())
        thunkAPI.dispatch(getPostings())
    }
)

export const editPosting = createAsyncThunk(
    'postings/editPosting',
    async (posting: TPosting1, thunkAPI) => {
        await axios.patch(`http://localhost:5000/api/v1/postings/${posting.id}`, posting)
        thunkAPI.dispatch(getAccounts())
        thunkAPI.dispatch(getPostings())
    }
)

export const deletePostingById = createAsyncThunk(
    'postings/deletePosting',
    async (postingId: number, thunkAPI) => {
        await axios.delete(`http://localhost:5000/api/v1/postings/${postingId}`)
        thunkAPI.dispatch(getAccounts())
        thunkAPI.dispatch(getPostings())
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

export default postingSlice.reducer