import "./PioneerPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {usePioneer} from "../../hooks/pioneers/usePioneer";

const PioneerPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {pioneer, fetchPioneer} = usePioneer()
    
    useEffect(() => {
        id && fetchPioneer(id)
    }, [])

    if (pioneer == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/pioneers/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{pioneer.name} ({pioneer.date_birthday}г - {pioneer.date_death}г)</h2>

                    <br />

                    <span>Биография: {pioneer.description}</span>

                </div>

            </div>

        </div>
    )
}

export default PioneerPage;