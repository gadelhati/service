import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const semana:string [] = ["D: ", "S: ", "T: ", "Q: ", "Q: ", "S: ", "S: "]
    const [militaryList, setMilitaryList] = useState<Military[]>(list)
    const [militaryCurrent, setMilitaryCurrent] = useState<Military>(militaryInitial)

    const couting = (): number => {
        let vector: number = 0
        militaryList?.map( element => { if(element.active) return vector+=1 })
        return vector
    }
    const search = (): Military => {
        console.log("4")
        let service: Military = militaryInitial
        militaryList?.map( element => {
            // who gave the service in the shortest time
            if(element.active && element.lastService >= service.lastService) {
                // if they served the same amount of time, the most modern wins
                if(element.lastService == service.lastService) {
                    if(element.antique > service.antique) {
                        service = element
                    }
                } else {
                    service = element
                }
            }
        })
        // setMilitaryList([...militaryList.filter(item => item.nip !== service.nip)])
        return service
    }
    const gadelha = () => {
        setMilitaryList(militaryList.filter(item => item !== search()))
    }
    const julianDay = (): any => {
        var d = new Date().getDate();
        var y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        return Math.floor((1461 * (y + 4800 + (m - 14) / 12)) / 4 + (367 * (m - 2 - 12 * ((m - 14) / 12))) / 12 - (3 * ((y + 4900 + (m - 14) / 12) / 100)) / 4 + d - 32075);
    }
    return (
        <>
            {couting()}
            {search().name}
            <button onClick={gadelha} >ok</button>
            {/* {JSON.stringify(gadelha())} */}
        </>)
}