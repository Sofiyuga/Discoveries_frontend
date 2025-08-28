import {useDispatch, useSelector} from 'react-redux';
import {
	updatePioneer,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} from "../../store/pioneers/pioneerSlice";
import {api} from "../../utils/api";

export function usePioneer() {
	const pioneer = useSelector(state => state.pioneer.pioneer);

	const dispatch = useDispatch()

	const setPioneer = (value) => {
		dispatch(updatePioneer(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setHeatOutput = (value) => {
		dispatch(updateHeatOutput(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchPioneer = async (id) => {

		const {data} = await api.get(`pioneers/${id}`);

		setPioneer(data)

	};

	return {
		pioneer,
		setPioneer,
		fetchPioneer,
		setName,
		setDescription,
		setHeatOutput,
		setImage
	};
}