import "./PioneersFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {usePioneers} from "../../../hooks/pioneers/usePioneers";

const PioneersFilters = () => {

    const {query, setQuery, fetchPioneers} = usePioneers()

    const handleSubmit = () => fetchPioneers()

    return (
        <div className="pioneers-filters">

            <h2>Поиск первооткрывателей</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default PioneersFilters