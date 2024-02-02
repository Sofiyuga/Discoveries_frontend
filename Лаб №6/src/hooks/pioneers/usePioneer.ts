import {useDispatch, useSelector} from 'react-redux';
import {
	updatePioneer
} from "../../store/pioneers/pioneerSlice";
import {api} from "../../utils/api";

export function usePioneer() {
	const pioneer = useSelector(state => state.pioneer.pioneer);

	const dispatch = useDispatch()

	const setPioneer = (value) => {
		dispatch(updatePioneer(value))
	}

	const fetchPioneer = async (id) => {

		const {data} = await api.get(`pioneers/${id}`);

		setPioneer(data)

	};

	return {
		pioneer,
		setPioneer,
		fetchPioneer
	};
}