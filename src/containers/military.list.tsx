import { useState } from "react"
import { militaryInitial } from "../components/military/military.initial"
import { Military } from "../components/military/military.interface"
import list from "../components/military/list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>(["D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S","D","S","T","Q","Q","S","S"])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)
    const [division, setDivision] = useState<Military[][]>([])

    const quickSort = (array: Military[]): Military[] => {
        if (array.length <= 1) {
            return array;
        }
        var pivot = array[0];
        var left = [];
        var right = [];
        for (var i = 1; i < array.length; i++) {
            array[i].antique < pivot.antique ? left.push(array[i]) : right.push(array[i]);
        }
        return quickSort(left).concat(pivot, quickSort(right));
    }
    const sort = () => {
        setMilitaryList(quickSort(militaryList))
    }
    const showList = () => {
        console.log(militaryList)
    }
    const composeDivision = () => {
        let total: number = Math.floor(militaryList.length/5)
        let rest: number = militaryList.length % 5
        let i: number = 0
        let aux: number = 0
        for (i = 0; i < militaryList.length; i = i + total + rest) {
                aux = i + total
                if(rest > 0) {
                    division.push(militaryList.slice(i, aux + 1))
                    rest--
                    if(rest == 0){i++}
                }
                else {
                    division.push(militaryList.slice(i, aux))
                }
        }
    }
    const showDivision = () => {
        console.log(division)
    }
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
                        if (new Date(element.dateOfService).toISOString() !== new Date(datt.setDate(date.getDate() - 6)).toISOString()) {
                            militarOfService = element
                        }
                    }
                }
            }
        })
        return militarOfService
    }
    const nextServiceByAntique = (militaries: Military[]): Military => {
        let militarOfService: Military = militaryInitial
        militaries?.map(element => {
            if (element.active) {
                if (element.antique < militarOfService.antique && militarOfService ! == militaryInitial) {
                    militarOfService = element
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
        return ""
    }

    return (
        <>
            <button onClick={sort} >1 - Sort List</button>
            <button onClick={showList} >2 - Show List</button>
            <button onClick={composeDivision} >{couting(true)}/{militaryList.length} - Compose Division</button>
            <button onClick={showDivision} >Show Division</button>
            <button onClick={semanal} >Escalar</button>
        </>)
}