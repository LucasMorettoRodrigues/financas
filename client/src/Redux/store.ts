import { configureStore } from '@reduxjs/toolkit'
import PostingReducer from './postingsSlice'
import AccountReducer from './accountsSlice'
// ...

const store = configureStore({
    reducer: {
        postings: PostingReducer,
        accounts: AccountReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store