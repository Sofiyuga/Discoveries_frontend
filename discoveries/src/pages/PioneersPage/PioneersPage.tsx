import "./PioneersPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import PioneersList from "./PioneersList/PioneersList";
import PioneersFilters from "./PioneersFilters/PioneersFilters";

const PioneersPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="pioneers-wrapper">

            <PioneersFilters />

            {!is_moderator && <PioneersList />}

        </div>
    )
}

export default PioneersPage;