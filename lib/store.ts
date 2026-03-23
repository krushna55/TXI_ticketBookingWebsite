import { configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from './slice/movieSlice'
import { movieApi } from "./slice/movieSupabaseApi";
import { cityApi } from "./slice/citySilce";
export const store = configureStore({
    reducer:{
        movieDetails : movieDetailsReducer,
        [movieApi.reducerPath] : movieApi.reducer,
        [cityApi.reducerPath] : cityApi.reducer
    },
    middleware:(getDefaultMiddlerware)=>
        getDefaultMiddlerware().concat(movieApi.middleware).concat(cityApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch