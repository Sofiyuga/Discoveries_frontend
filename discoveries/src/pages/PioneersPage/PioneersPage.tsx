import "./PioneersPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import PioneersList from "./PioneersList/PioneersList";
import PioneersTableWrapper from "./PioneersTableWrapper/PioneersTableWrapper";

const PioneersPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="substances-wrapper">

            {!is_moderator && <PioneersList />}
            {is_moderator && <PioneersTableWrapper />}

        </div>
    )
}

export default PioneersPage;