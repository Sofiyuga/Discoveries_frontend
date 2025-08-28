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
		},
		updateName(state, action) {
			state.pioneer.name = action.payload
		},
		updateDescription(state, action) {
			state.pioneer.description = action.payload
		},
		updateHeatOutput(state, action) {
			state.pioneer.heat_output = action.payload
		},
		updateImage(state, action) {
			state.pioneer.image = action.payload
		}
	}
})

export const {
	updatePioneer,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} = pioneerSlice.actions;

export default pioneerSlice.reducer;