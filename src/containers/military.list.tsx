import { useState } from "react"
import { militaryInitial } from "../components/military/military.initial"
import { Military } from "../components/military/military.interface"
import list from "../components/military/list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>(["D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S"])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)
    const [division, setDivision] = useState<Military[][]>([])
    const [military, setMilitary] = useState<Military>(militaryInitial)

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
    const composeDivision = (vector: Military[]): Military [][] => {
        let division: Military [][] = []
        let total: number = Math.floor(vector.length / 5)
        let rest: number = vector.length % 5
        let i: number = 0
        for (i = 0; i < vector.length; i = i + total + rest) {
            if (rest > 0) {
                division.push(vector.slice(i, i + total + 1))
                rest--
                if (rest == 0) { i++ }
            }
            else {
                division.push(vector.slice(i, i + total))
            }
        }
        setDivision(division)
        return division
    }
    const showDivision = () => {
        console.log(division)
    }
    const nextDivisionMilitary = (militaries: Military[], date: Date): Military => {
        let militarOfService: Military = militaryInitial
        let datt: Date = new Date()
        militaries?.map(element => {
            if (new Date(element.dateOfService).toISOString() <= new Date(militarOfService.dateOfService).toISOString()) {
                if (new Date(element.dateOfService).toISOString() == new Date(militarOfService.dateOfService).toISOString()) {
                    if (element.antique > militarOfService.antique) {
                        militarOfService = element
                    }
                } else {
                    if (new Date(element.dateOfService).toISOString() !== new Date(datt.setDate(date.getDate() - 6)).toISOString()) {
                        militarOfService = element
                    }
                }
            }
        })
        militarOfService.dateOfService = new Date().toISOString().toString()
        setMilitary(militarOfService)
        // setDivision(division)
        setMilitaryList([...militaryList.filter(item => item.nip != militarOfService.nip), militarOfService])
        // setDivision([...militaryList.filter(item => item.nip != militarOfService.nip), militarOfService])
        return militarOfService
    }
    const showNextDivision = () => {
        for(let i = 0; i<5 ; i++) {
            console.log(nextDivisionMilitary(division[i], new Date()).name)
        }
    }

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map(element => { if (element.active == activation) return vector += 1 })
        return vector
    }
    const listing = (activation: boolean): Military[] => {
        let vector: Military[] = []
        militaryList?.map(element => { if (element.active == activation) return vector.push(element) })
        return vector
    }
    const nextDivisionOfService = (militaries: Military[], date: Date): Military => {
        let militaryOfService: Military = militaryInitial
        // let date: Date = new Date()
        militaries.map(element => {
            console.log(element.name + " - " +element.divisionOfService)
        })
        return militaryOfService
    }
    const nextTime = (original: Military, teste: Military): boolean => {
        if (original.horary !== teste.horary) {
            return !original.horary
        } else if (original.antique > teste.antique) {
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
            {couting(false)+"/"+couting(true)}
            <button onClick={sort} >1</button>
            <button onClick={showList} >2</button>
            <button onClick={() => composeDivision(listing(true))} >3</button>
            <button onClick={showDivision} >4</button>
            <button onClick={showNextDivision} >Next Division Military</button>

            <button onClick={() => nextDivisionOfService(listing(true), new Date())} >Next Division</button>
            
            <button onClick={semanal} >Escalar</button>
        </>)
}