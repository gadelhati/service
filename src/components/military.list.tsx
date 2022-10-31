import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>([])
    const [service1, setService1] = useState<Military>(militaryInitial)
    const [service2, setService2] = useState<Military>(militaryInitial)
    const [militaryList, setMilitaryList] = useState<Military[]>(list)

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map(element => { if (element.active == activation) return vector += 1 })
        return vector
    }
    const nextService = (militaries: Military[]): Military => {
        let service: Military = militaryInitial
        militaries?.map(element => {
            if (element.active && element.lastService >= service.lastService) {
                if (element.lastService == service.lastService) {
                    if (element.antique > service.antique) {
                        service = element
                    }
                } else if (element.lastService != 7) {
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
    const assign = () => {
        let service1: Military = nextService(militaryList)
        let service2: Military = nextService(militaryList.filter(item => item !== service1))
        service1.lastService = 0
        service2.lastService = 0
        service1.horary = nextTime(service1, service2)
        service2.horary = !service1.horary
        militaryList.filter(item => item !== service1 || item !== service2).map(element => {
            element.lastService += 1
        })
        addMilitaryList(service1)
        addMilitaryList(service2)
        setService1(service1)
        setService2(service2)
        console.log(new Date(new Date().setDate(new Date(service1.dateOfService).getDate() + 50)))
        setScale([...scale, service1.name+" "+service1.horary, service2.name+" "+service2.horary])
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