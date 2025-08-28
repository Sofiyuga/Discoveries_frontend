import {usePioneers} from "../../../hooks/pioneers/usePioneers";
import {useQuery} from "react-query";
import PioneersTable from "./PioneersTable/PioneersTable";

const PioneersTableWrapper = () => {

    const {searchPioneers} = usePioneers()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["pioneers"],
        () => searchPioneers(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <PioneersTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default PioneersTableWrapper