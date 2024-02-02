import {useDispatch, useSelector} from 'react-redux';
import {
	updatePioneers,
	updateQuery
} from "../../store/pioneers/pioneersSlice";
import {api} from "../../utils/api";
import {useDiscovery} from "../discoveries/useDiscovery";
import {useToken} from "../users/useToken";
import {useAuth} from "../users/useAuth";
import {AxiosRequestConfig} from "axios";

export function usePioneers() {
	const pioneers = useSelector(state => state.pioneers.pioneers);
	const query = useSelector(state => state.pioneers.query);

	const {is_authenticated} = useAuth()

	const {access_token} = useToken()

	const {fetchDiscovery} = useDiscovery()

	const dispatch = useDispatch()

	const setPioneers = (value) => {
		dispatch(updatePioneers(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchPioneers = async () => {

		const {data} = await api.get(`pioneers/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_discovery_id = data["draft_discovery_id"]
		draft_discovery_id && fetchDiscovery(draft_discovery_id)

		return data["pioneers"]
	}

	const fetchPioneers = async () => {
		searchPioneers().then(data => setPioneers(data))
	}

	return {
		pioneers,
		setPioneers,
		query,
		setQuery,
		searchPioneers,
		fetchPioneers
	};
}