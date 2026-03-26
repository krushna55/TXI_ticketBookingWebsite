import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from "./slice/movieSlice";
import { movieApi } from "./slice/movieSupabaseApi";
import { cityApi } from "./slice/citySilce";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage"; 


const createNoopStorage = () => {
  return {
    getItem(_key:string) {
      return Promise.resolve(null);
    },
    setItem(_key:string, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:string) {
      return Promise.resolve(null);
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
const rootReducder = combineReducers({
  movieDetails: movieDetailsReducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
});
const persistConfig = {
    key :  'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducder)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlerware) =>
    getDefaultMiddlerware({
        serializableCheck:{
            ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
      .concat(movieApi.middleware)
      .concat(cityApi.middleware),
});
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
