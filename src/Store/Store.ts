import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./features/user.slice"

export const myStore=configureStore({
  reducer:{
    userReducer,
  },
})

type AppStore=typeof myStore;
export type AppState=ReturnType<AppStore["getState"]>;
export type AppDispatch=AppStore["dispatch"];