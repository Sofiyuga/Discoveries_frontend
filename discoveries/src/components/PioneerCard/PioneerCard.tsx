import "./PioneerCard.sass"
import {Pioneer} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useDiscovery} from "../../hooks/discoveries/useDiscovery";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {api} from "../../utils/api";
import {useEffect, useState} from "react";
import {useToken} from "../../hooks/users/useToken";
import CustomInput from "../CustomInput/CustomInput";
import {usePioneers} from "../../hooks/pioneers/usePioneers";

const PioneerCard = ({ pioneer, flag }: {pioneer:Pioneer}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {searchPioneers} = usePioneers()

    const {discovery, is_draft, addPioneerToDiscovery, deletePioneerFromDiscovery} = useDiscovery()

    const handleAddPioneer = async (e) => {
        e.preventDefault()
        
        await addPioneerToDiscovery(pioneer)
        await searchPioneers()
    }

    const handleDeletePioneer = async (e) => {
        e.preventDefault()
        await deletePioneerFromDiscovery(pioneer)
        await searchPioneers()
    }

    const {access_token} = useToken()

    const updateValue = async () => {
        const form_data = new FormData()

        form_data.append('percent_in', value)

        await api.put(`discoveries/${discovery.id}/update_pioneer/${pioneer.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const fetchValue = async () => {
        const {data} = await api.get(`discoveries/${discovery.id}/pioneers/${pioneer.id}/`, {
            headers: {
                'authorization': access_token
            }
        })

        setValue(data)
    }

    const [value, setValue] = useState()

    useEffect(() => {
        location.pathname.includes("discoveries") && fetchValue()
    }, [])

    useEffect(() => {
        value && updateValue()
    }, [flag])

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

                {/* {location.pathname.includes("discoveries") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Проверка в архиве)" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                } */}

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