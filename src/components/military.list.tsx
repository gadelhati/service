import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>(["D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S"])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map(element => { if (element.active == activation) return vector += 1 })
        return vector
    }
    const nextService = (militaries: Military[], date: Date): Military => {
        let militarOfService: Military = militaryInitial
        let datt: Date = new Date()
        militaries?.map(element => {
            if (element.active) {
                if (new Date(element.dateOfService).getTime() <= new Date(militarOfService.dateOfService).getTime()) { //1669698924563<=1669785324563
                    if (new Date(element.dateOfService).getTime() == new Date(militarOfService.dateOfService).getTime()) {
                        if (element.antique > militarOfService.antique) {
                            militarOfService = element
                        }
                    } else {
                        if (new Date(element.dateOfService).getDate() !== new Date(datt.setDate(date.getDate() - 6)).getDate()) {
                            militarOfService = element
                        }
                    }
                }
            }
        })
        return militarOfService
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
    const addMilitaryList = (military: Military) => {
        setMilitaryList([...militaryList.filter(item => item != military), military])
    }
    const semanal = (): string => {
        let date = new Date(new Date().setDate(new Date().getDate() - 1))//Wed Nov 02 2022 01:38:56 GMT-0300 (Horário Padrão de Brasília)
        let military = militaryInitial
        scale.map((element, index) =>{
            military = nextService(militaryList, date)
            military.dateOfService = new Date(date.setDate(date.getDate() + 1)).toISOString()//2022-11-03T05:06:04.899Z
            addMilitaryList(military)
            console.log(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ": " + military.name)
        })
        return ""
    }
    return (
        <>
            <button onClick={semanal} >Escalar</button>
        </>)
}