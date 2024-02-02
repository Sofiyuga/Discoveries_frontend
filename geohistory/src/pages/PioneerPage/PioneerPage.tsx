import "./PioneerPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iPioneersMock, requestTime} from "../../utils/consts";
import {Pioneer} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const PioneerPage = ({ selectedPioneer, setSelectedPioneer }: { selectedPioneer:Pioneer | undefined, setSelectedPioneer: Dispatch<Pioneer| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pioneers/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Pioneer = await response.json()

            setSelectedPioneer(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedPioneer(iPioneersMock.find((service:Pioneer) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/pioneers/${id}/image/`

    if (selectedPioneer == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedPioneer.name}</h2>

                    <br />

                    <span>{selectedPioneer.description}</span>

                    <br />

                    <span>Дата рождения: {selectedPioneer.date_birthday}г</span>

                    <br />

                    <span>Дата смерти: {selectedPioneer.date_death}г</span>

                </div>

            </div>

        </div>
    )
}

export default PioneerPage;