import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import shortFilmSlice from "./ShortFilmSlice";
import AssignCastSlice from "./AssignCastSlice";
import LoginSlice from "./LoginSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        shortfilm: shortFilmSlice,
        assignCast: AssignCastSlice,
        login: LoginSlice
    }
})

export default store;