import { ChangeEvent, useState } from "react"
import { Service } from "../containers/service"

interface ScaleInterface { step: number }
const ScaleCurrent : ScaleInterface = { step: 0 }

export const Scale = () => {
    const [scale, setTabuleiro] = useState(ScaleCurrent)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setTabuleiro({ ...scale, [event.target.name]: event.target.value }) }
    return (
        <>
            <Service position='one'>um</Service>
            <Service position='two'>dois</Service>
            <Service position='three'>três</Service>
            <Service position='four'>quatro</Service>
            <Service position='five'>cinco</Service>
            <Service position='five'>seis</Service>
        </>)
}