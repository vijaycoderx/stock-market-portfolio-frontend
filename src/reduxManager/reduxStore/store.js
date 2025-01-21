import { configureStore } from "@reduxjs/toolkit"
// import counterReducer from "../features/counter/counterSlice";
// import { menuReducer } from "../features/counter/menuSlice";
import menuReducer from "../features/counter/menuSlice"
import userReducer from "../features/counter/userSlice"

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
    }
})

export default store;