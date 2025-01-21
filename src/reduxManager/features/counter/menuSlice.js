import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menuOptionSelected: "",
    },

    reducers: {
        selectMenuOption: (state, action) => {
            state.menuOptionSelected = action.payload
        },

    }
})

export const { selectMenuOption } = menuSlice.actions

export default menuSlice.reducer