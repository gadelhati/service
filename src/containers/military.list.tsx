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
    const composeDivisions = (vector: Military[]): Military [][] => {
        let division = []
        let total: number = Math.floor(vector.length / 5)
        let rest: number = vector.length % 5
        let count: number = 0
        let inicio: number = 0
        for (let i = 0; i < vector.length; i ++) {
            if(count == total-1 + (rest > 0? 1:0)) {
                count = 0
                division.push(vector.slice(inicio, i + 1))
                inicio = i + 1
                if(rest != 0) {
                    rest --
                }
            } else {
                count++
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
            <button onClick={sort} >1 sort</button>
            <button onClick={showList} >2 show</button>
            <button onClick={()=>composeDivisions(listing(true))} >3 compose</button>
            <button onClick={showDivision} >4 show</button>
            <button onClick={showNextDivision} >Next Division Military</button>

            <button onClick={() => nextDivisionOfService(listing(true), new Date())} >Next Division</button>
            
            <button onClick={semanal} >Escalar</button>
        </>)
}