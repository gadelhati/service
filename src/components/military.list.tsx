import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>([])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)
    // const [militaryCurrent, setMilitaryCurrent] = useState<Military>(militaryInitial)

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map( element => { if(element.active == activation) return vector+=1 })
        return vector
    }
    const nextService = (militaries: Military[]): Military => {
        let service: Military = militaryInitial
        militaries?.map( element => {
            if(element.active && element.lastService >= service.lastService) {
                if(element.lastService == service.lastService) {
                    if(element.antique > service.antique) {
                        service = element
                    }
                } else {
                    service = element
                }
            }
        })
        return service
    }
    const assign = () => {
        let service: Military = nextService(militaryList)
        setScale([...scale, service.name])
        service.lastService = 0
        militaryList.filter(item => item !== service).map( element => {
            element.lastService += 1
        })
        setMilitaryList([...militaryList.filter(item => item !== service), service])
        // setMilitaryCurrent(service)
    }
    const julianDay = (): any => {
        var d = new Date().getDate();
        var y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        return Math.floor((1461 * (y + 4800 + (m - 14) / 12)) / 4 + (367 * (m - 2 - 12 * ((m - 14) / 12))) / 12 - (3 * ((y + 4900 + (m - 14) / 12) / 100)) / 4 + d - 32075);
    }
    return (
        <>
            <div>{couting(true)}</div>
            <button onClick={assign} >ok</button>
            <div>{scale}</div>
        </>)
}