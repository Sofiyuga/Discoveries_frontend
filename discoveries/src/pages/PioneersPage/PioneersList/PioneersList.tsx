import "./PioneersList.sass"
import PioneerCard from "../../../components/PioneerCard/PioneerCard";
import {usePioneers} from "../../../hooks/pioneers/usePioneers";
import {useQuery} from "react-query";
import PioneersFilters from "../PioneersFilters/PioneersFilters";

const PioneersList = () => {

    const {searchPioneers} = usePioneers()

    const { isLoading, data, refetch } = useQuery(
        ["pioneers"],
        () => searchPioneers(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(pioneer  => (
        <PioneerCard pioneer={pioneer} key={pioneer.id}/>
    ))

    return (
        <div className="substances-list-wrapper">

            <PioneersFilters refetch={refetch}/>

            <div className="substances-list">
                { cards }
            </div>

        </div>
    )
}

export default PioneersList;