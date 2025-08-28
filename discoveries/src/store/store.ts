import {configureStore} from "@reduxjs/toolkit";

import pioneerReducer from "./pioneers/pioneerSlice"
import draftDiscoveryReducer from "./discoveries/discoverySlice"
import authReducer from "./users/authSlice"
import discoveriesReducer from "./discoveries/discoveriesSlice"
import pioneersReducer  from "./pioneers/pioneersSlice"

export default configureStore({
	reducer: {
		pioneer: pioneerReducer,
		pioneers: pioneersReducer,
		discovery: draftDiscoveryReducer,
		discoveries: discoveriesReducer,
		user: authReducer
	}
});