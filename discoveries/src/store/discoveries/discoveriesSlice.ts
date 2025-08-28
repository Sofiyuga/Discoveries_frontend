import {createSlice} from "@reduxjs/toolkit"

const initialState= {
	status: -1,
	date_start: "2021-09-01",
	date_end: "2024-02-12",
	user: ""
};

const discoveriesSlice = createSlice({
	name: 'discoveries',
	initialState: initialState,
	reducers: {
		updateStatus(state, action) {
			state.status = action.payload
		},
		updateDateStart(state, action) {
			state.date_start = action.payload
		},
		updateDateEnd(state, action) {
			state.date_end = action.payload
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	}
})

export const {updateStatus, updateDateStart, updateDateEnd, updateUser} = discoveriesSlice.actions;

export default discoveriesSlice.reducer;