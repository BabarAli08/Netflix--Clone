import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name: 'list',
    initialState: {
        list: []
    },
    reducers: {
        addToList: (state, action) => {
            const exists = state.list.find(item => item.id === action.payload.id)

            if (!exists) {
                state.list.push(action.payload)
            }

        },
        removeFromList: (state, action) => {
            state.list= state.list.filter(item => item.id !== action.payload)
        }
    }
})


export const { addToList, removeFromList } = userListSlice.actions;
export default userListSlice.reducer;
