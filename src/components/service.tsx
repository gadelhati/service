import { ChangeEvent, useState } from "react"
import { Button } from "../containers/button"
import { Input } from "../containers/input"

interface ServiceInterface { step: number }
const StepCurrent : ServiceInterface = { step: 0 }

export const Service = () => {
    const [service, setTabuleiro] = useState(StepCurrent)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setTabuleiro({ ...service, [event.target.name]: event.target.value }) }
    return (
        <>
            <Input onChange={handleChange} value={service.step} type="text" name="step" />
            <Button>ENVIAR</Button>
            {service.step}
        </>)
}