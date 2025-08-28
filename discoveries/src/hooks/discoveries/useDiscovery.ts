import {useDispatch, useSelector} from 'react-redux';
import {
	updateDescription,
	updateName,
	updateDiscovery
} from "../../store/discoveries/discoverySlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import axios from 'axios';

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

	const sendDiscovery = async () => {

		const response = await api.put(`discoveries/${discovery.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
		await axios.post('http://localhost:8080/calc_checking_in_archive/', {'discoveries_id':discovery.id}) 
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
		await api.post(`pioneers/${pioneer.id}/add_to_discovery/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deletePioneerFromDiscovery = async (pioneer) => {
		await api.delete(`discoveries/${discovery.id}/delete_pioneer/${pioneer.id}/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		discovery,
		is_draft,
		setDiscovery,
		setName,
		setDescription,
		saveDiscovery,
		sendDiscovery,
		deleteDiscovery,
		fetchDiscovery,
		addPioneerToDiscovery,
		deletePioneerFromDiscovery
	};
}