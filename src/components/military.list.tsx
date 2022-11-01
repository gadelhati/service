import { useState } from "react"
import { militaryInitial } from "./military.initial"
import { Military } from "./military.interface"
import list from "./list.json"

export const MilitaryList = () => {
    const [scale, setScale] = useState<string[]>(["","","","","","","","","",""])
    const [militaryList, setMilitaryList] = useState<Military[]>(list)

    const couting = (activation: boolean): number => {
        let vector: number = 0
        militaryList?.map(element => { if (element.active == activation) return vector += 1 })
        return vector
    }
    const nextService = (militaries: Military[]): Military => {
        let militarOfService: Military = militaryInitial
        militaries?.map(element => {
            if (element.active && new Date(element.dateOfService).getTime() >= new Date(militarOfService.dateOfService).getTime()) {
                if (new Date(element.dateOfService).getTime() == new Date(militarOfService.dateOfService).getTime()) {
                    if (element.antique > militarOfService.antique) {
                        militarOfService = element
                    }
                } else if (new Date(element.dateOfService).getTime() != new Date(new Date().setDate(new Date(element.dateOfService).getDate() - 7)).getTime()) {
                    // console.log("1" + new Date(element.dateOfService).getTime())
                    // console.log("2" + new Date(new Date().setDate(new Date(element.dateOfService).getDate() - 7)).getTime())
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
    const assign = (date: Date): Military => {
        let militaryOfService: Military = nextService(militaryList)
        militaryOfService.dateOfService = new Date().toString()
        // militaryList.filter(item => item !== militaryOfService).map(element => {
            // element.lastService += 1
            // if(element.name == "FLORENTINO") {
            //     console.log(element.dateOfService)
            // }
            // element.dateOfService = new Date(new Date().setDate(new Date(element.dateOfService).getDate() + 1)).toString()
            militaryOfService.dateOfService = date.getTime().toString()
        // })
        addMilitaryList(militaryOfService)
        return militaryOfService
        // setScale([...scale, militaryOfService.name+" "+militaryOfService.dateOfService])
    }
    const addMilitaryList = (military: Military) => {
        setMilitaryList([...militaryList.filter(item => item != military), military])
    }
    const semanal = (): string => {
        let date = new Date(new Date().setDate(new Date().getDate() - 1))
        scale.map((element, index) =>{
            // console.log("2: " + new Date(new Date().setDate(new Date().getDate() + index)))
            console.log(assign(new Date(new Date().setDate(new Date().getDate() + 1))))
        })
        return ""
    }
    return (
        <>
            <button onClick={semanal} >Assign {couting(true)}</button>
            {scale.map((element, index) =>
                <p>{element}</p>
            )}
        </>)
}