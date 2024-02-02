import {useDispatch, useSelector} from 'react-redux';
import {
	updateYear,
	updateDescription,
	updateDiscovery,
	updateName
} from "../../store/discoveries/discoverySlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useDiscovery() {

	const {access_token} = useToken()

	const discovery = useSelector(state => state.discovery.discovery)

	const is_draft = discovery?.status == 1

	const dispatch = useDispatch()

	const setDiscovery = (value) => {
		dispatch(updateDiscovery(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setYear = (value) => {
		dispatch(updateYear(value))
	}

	const sendDiscovery = async () => {

		const response = await api.put(`discoveries/${discovery.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setDiscovery(undefined)
		}
	}

	const deleteDiscovery = async () => {

		const response = await api.delete(`discoveries/${discovery.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setDiscovery(undefined)
		}

	}

	const saveDiscovery = async () => {

		const form_data = new FormData()

		form_data.append('name', discovery.name)
		form_data.append('description', discovery.description)
		form_data.append('year', discovery.year)

		await api.put(`discoveries/${discovery.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchDiscovery = async (discovery_id) => {

		const {data} = await api.get(`discoveries/${discovery_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setDiscovery(data)
	}

	const addPioneerToDiscovery = async (pioneer) => {

		const response = await api.post(`pioneers/${pioneer.id}/add_to_discovery/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setDiscovery(response.data)
		}
	}

	const deletePioneerFromDiscovery = async (pioneer) => {
		const response = await api.delete(`discoveries/${discovery.id}/delete_pioneer/${pioneer.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setDiscovery(response.data)
		}
	}

	return {
		discovery,
		is_draft,
		setDiscovery,
		setName,
		setDescription,
		setYear,
		saveDiscovery,
		sendDiscovery,
		deleteDiscovery,
		fetchDiscovery,
		addPioneerToDiscovery,
		deletePioneerFromDiscovery
	};
}