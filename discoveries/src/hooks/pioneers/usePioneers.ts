import {useDispatch, useSelector} from 'react-redux';
import {
	updatePioneers,
	updateQuery
} from "../../store/pioneers/pioneersSlice";
import {api} from "../../utils/api";
import {useDiscovery} from "../discoveries/useDiscovery";
import {useToken} from "../users/useToken";

export function usePioneers() {
	const pioneers = useSelector(state => state.pioneers.pioneers);
	const query = useSelector(state => state.pioneers.query);

	const {access_token} = useToken()

	const {setDiscovery, fetchDiscovery} = useDiscovery()

	const dispatch = useDispatch()

	const setPioneers = (value) => {
		dispatch(updatePioneers(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchPioneers = async () => {

		const {data} = await api.get(`pioneers/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_discovery_id = data["draft_discovery_id"]
		if (draft_discovery_id) {
			fetchDiscovery(draft_discovery_id)
		} else {
			setDiscovery(undefined)
		}


		return data["pioneers"]
	}

	return {
		pioneers,
		setPioneers,
		query,
		setQuery,
		searchPioneers
	};
}