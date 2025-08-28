import "./PioneersFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {usePioneers} from "../../../hooks/pioneers/usePioneers";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const PioneersFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = usePioneers()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="substances-filters">

            <h2>Поиск Первооткрывателей</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/pioneers/add" bg={variables.primary}>
                        Добавить первооткрывателя
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default PioneersFilters