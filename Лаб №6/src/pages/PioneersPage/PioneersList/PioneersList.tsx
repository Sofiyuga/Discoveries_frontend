import "./PioneersList.sass"
import {useEffect} from "react";
import PioneerCard from "../../../components/PioneerCard/PioneerCard";
import {usePioneers} from "../../../hooks/pioneers/usePioneers";

const PioneersList = () => {

    const {pioneers, fetchPioneers} = usePioneers()

    useEffect(() => {
        fetchPioneers()
    }, [])

    const cards = pioneers.map(pioneer  => (
        <PioneerCard pioneer={pioneer} key={pioneer.id}/>
    ))

    return (
        <div className="pioneers-list">

            { cards }

        </div>
    )
}

export default PioneersList;