import {useEffect} from "react";
import {useDiscovery} from "../../hooks/discoveries/useDiscovery";
import {useNavigate, useParams} from "react-router-dom"
import PioneerCard from "../../components/PioneerCard/PioneerCard";
import "./DiscoveryPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";

const DiscoveryPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {discovery, setName, setDescription, setYear, fetchDiscovery, saveDiscovery, sendDiscovery, deleteDiscovery, setDiscovery} = useDiscovery()

    useEffect(() => {
        id && fetchDiscovery(id)
        
        return () => {
            setDiscovery(undefined)
        };
    }, [])

    if (id == undefined || discovery == undefined)
    {
        return (
            <div className="discovery-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendDiscovery = async() => {
        await saveDiscovery()
        await sendDiscovery()
        navigate("/discoveries")
    }

    const onDeleteDiscovery = async () => {
        await deleteDiscovery()
        navigate("/pioneers")
    }

    const cards = discovery.pioneers.map(pioneer  => (
        <PioneerCard pioneer={pioneer} key={pioneer.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveDiscovery} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendDiscovery} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteDiscovery} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = discovery.status == 1

    const completed = [3, 4].includes(discovery.status)

    return (
        <div className="discovery-page-wrapper">

            <div className="discovery-pioneers-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новое открытие" : discovery.name}</h3>
                </div>

                <div className="discovery-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == discovery.status).name}</span>
                    <span>Дата создания: {moment(discovery.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(discovery.status) && <span>Дата формирования: {moment(discovery.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(discovery.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Покупатель: {discovery.owner.name}</span> }
                    {is_moderator && <span>Модератор: {discovery.moderator.name}</span>}
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название" value={discovery.name} setValue={setName} disabled={!is_draft}  />
                    <CustomTextarea placeholder="Описание" value={discovery.description} setValue={setDescription} disabled={!is_draft}  />
                    <CustomInput placeholder="Год" value={discovery.year} setValue={setYear} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Первооткрыватели</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default DiscoveryPage