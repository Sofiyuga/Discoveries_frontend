import "./PioneerEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {usePioneer} from "../../hooks/pioneers/usePioneer";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const PioneerEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        pioneer,
        fetchPioneer,
        setName,
        setDescription,
        setHeatOutput,
        setImage
    } = usePioneer()

    useEffect(() => {
        id && fetchPioneer(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const savePioneer = async() => {
        let form_data = new FormData()

        form_data.append('name', pioneer.name)
        form_data.append('description', pioneer.description)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`pioneers/${pioneer.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/pioneers/")
        }
    }

    const deletePioneer = async () => {

        const response = await api.delete(`pioneers/${pioneer.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/pioneers/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (pioneer == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={pioneer.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={pioneer.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={pioneer.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={savePioneer}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deletePioneer}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PioneerEditPage