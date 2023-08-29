import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: []
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {

		setItemsPizzas(state, action) {
			state.items = action.payload;
		},
	},
})

export const { setItemsPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer