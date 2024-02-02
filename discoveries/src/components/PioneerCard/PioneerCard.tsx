import "./PioneerCard.sass"
import {Pioneer} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useDiscovery} from "../../hooks/discoveries/useDiscovery";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const PioneerCard = ({ pioneer }: {pioneer:Pioneer}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {discovery, is_draft, addPioneerToDiscovery, deletePioneerFromDiscovery} = useDiscovery()

    const handleAddPioneer = (e) => {
        e.preventDefault()
        addPioneerToDiscovery(pioneer)
    }

    const handleDeletePioneer = (e) => {
        deletePioneerFromDiscovery(pioneer)
    }

    const is_chosen = discovery?.pioneers.find(g => g.id == pioneer.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={pioneer.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {pioneer.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/pioneers/${pioneer.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("pioneers") &&
                        <CustomButton onClick={handleAddPioneer} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("pioneers") &&
                        <CustomButton onClick={handleDeletePioneer} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("discoveries") &&
                        <CustomButton onClick={handleDeletePioneer} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default PioneerCard;