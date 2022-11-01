import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>([])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map(element => { if (element.active == activation) return vector += 1 })
        return vector
    }
    const nextService = (militaries: Military[]): Military => {
        let service: Military = militaryInitial
        militaries?.map(element => {
            if (element.active && new Date(element.dateOfService).getTime() >= new Date(service.dateOfService).getTime()) {
                if (new Date(element.dateOfService).getTime() == new Date(service.lastService).getTime()) {
                    if (element.antique > service.antique) {
                        service = element
                    }
                } else if (new Date(element.lastService).getTime() != new Date(new Date().setDate(new Date().getDate() - 7)).getTime()) {
                    service = element
                }
            }
        })
        return service
    }
    const nextTime = (original: Military, teste: Military): boolean => {
        if(original.horary !== teste.horary) {
            return !original.horary
        } else if(original.antique > teste.antique) {
            return original.horary
        } else {
            return !original.horary
        }
    }
    const assign = (/*military: Military*/) => {
        let service: Military = nextService(militaryList)
        service.dateOfService = new Date().toString()
        militaryList.filter(item => item !== service).map(element => {
            element.lastService += 1
            element.dateOfService = new Date(new Date().setDate(new Date(element.dateOfService).getDate() + 1)).toString()
        })
        addMilitaryList(service)
        setScale([...scale, service.name+" "+service.dateOfService])
    }
    const addMilitaryList = (military: Military) => {
        setMilitaryList([...militaryList.filter(item => item != military), military])
    }
    return (
        <>
            <button onClick={assign} >Assign {couting(true)}</button>
            {scale.map((element, index) =>
                <p>{element}</p>
            )}
        </>)
}