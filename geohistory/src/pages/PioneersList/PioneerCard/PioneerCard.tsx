import "./PioneerCard.sass"
import {Pioneer} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const PioneerCard = ({ pioneer, isMock }: {pioneer:Pioneer, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/pioneers/${pioneer.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{pioneer.name}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/pioneers/${pioneer.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default PioneerCard;