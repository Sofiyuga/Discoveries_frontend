import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	discovery: undefined
};

const discoverySlice = createSlice({
	name: 'discovery',
	initialState: initialState,
	reducers: {
		updateDiscovery(state, action) {
			state.discovery = action.payload
		},
		updateName(state, action){
			state.discovery.name = action.payload
		},
		updateDescription(state, action){
			state.discovery.description = action.payload
		},
		updateYear(state, action){
			state.discovery.year = action.payload
		}
	}
})

export const {updateDiscovery, updateName, updateDescription, updateYear} = discoverySlice.actions;

export default discoverySlice.reducer;