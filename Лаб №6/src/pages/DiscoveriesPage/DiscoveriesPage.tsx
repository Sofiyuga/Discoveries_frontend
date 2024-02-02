import DiscoveriesTable from "./DiscoveriesTable/DiscoveriesTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const DiscoveriesPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/pioneers")
        }
    }, [])

    return (
        <div>
            <DiscoveriesTable />
        </div>
    )
}

export default DiscoveriesPage;

