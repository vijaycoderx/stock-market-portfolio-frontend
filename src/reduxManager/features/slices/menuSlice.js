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

        selectMenuType: (state, action) => {
            state.platform = action.payload
        },
        menuToggleSelection: (state, action) => {
            state.menuToggle = action.payload
        },


    }
})

export const { selectMenuOption, selectMenuType, menuToggleSelection} = menuSlice.actions

export default menuSlice.reducer