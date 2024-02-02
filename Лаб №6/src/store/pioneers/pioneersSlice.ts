import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	pioneers: [],
	query: ""
};

const pioneersSlice = createSlice({
	name: 'pioneers',
	initialState: initialState,
	reducers: {
		updatePioneers(state, action) {
			state.pioneers = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updatePioneers,
	updateQuery
} = pioneersSlice.actions;

export default pioneersSlice.reducer;