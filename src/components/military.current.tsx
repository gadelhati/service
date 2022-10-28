import { ChangeEvent, useState } from "react"
import { Button } from "../containers/button"
import { Input } from "../containers/input"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"

export const MilitaryCurrent = () => {
    const [military, setMilitary] = useState(militaryInitial)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setMilitary({ ...military, [event.target.name]: event.target.value }) }
    return (
        <>
            <Input onChange={handleChange} value={military.name} type="text" name="name" />
            <Button>ENVIAR</Button>
            {military.name}
        </>)
}