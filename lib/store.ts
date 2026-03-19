import { configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from './slice/movieSlice'
import { movieApi } from "./slice/movieSupabaseApi";
export const store = configureStore({
    reducer:{
        movieDetails : movieDetailsReducer,
        [movieApi.reducerPath] : movieApi.reducer
    },
    middleware:(getDefaultMiddlerware)=>
        getDefaultMiddlerware().concat(movieApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch