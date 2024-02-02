import "./DiscoveryConstructor.sass"
import {useDiscovery} from "../../hooks/discoveries/useDiscovery";
import {Link} from "react-router-dom";

const DiscoveryConstructor = () => {

    const {discovery} = useDiscovery()

    if (discovery == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новое открытие</span>
            </div>
        )
    }

    return (
        <Link to={`/discoveries/${discovery.id}`} className="constructor-container">
            <span className="title">Новое открытие</span>
            {discovery.pioneers.length > 0 && <span className="badge">{discovery.pioneers.length}</span>}
        </Link>
    )
}

export default DiscoveryConstructor