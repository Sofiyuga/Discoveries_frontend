import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	pioneer: undefined,
};

const pioneerSlice = createSlice({
	name: 'pioneer',
	initialState: initialState,
	reducers: {
		updatePioneer(state, action) {
			state.pioneer = action.payload
		}
	}
})

export const {
	updatePioneer
} = pioneerSlice.actions;

export default pioneerSlice.reducer;