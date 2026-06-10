import type { Id } from "react-toastify"

export type action = 
    {type: "ADD_PROJECT" , payload: projectType} |
    {type: "REMOVE_PROJECT", payload?: any}

export interface projectType {
    id: Id,
    name: string,
    summary: string,
    domain: string,
    completion: number,
    features: string[]
}