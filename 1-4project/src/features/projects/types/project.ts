import type { Id } from "react-toastify"

export type action = 
    {type: "ADD_PROJECT" , payload: projectType} |
    {type: "REMOVE_PROJECT", payload?: any}|
    {type: "TOGGLE_FEATURE", payload: Id}

export interface projectType {
    id: Id,
    name: string,
    summary: string,
    domain: string,
    completion: number,
    features: feature[]
}

export type feature={
    id: Id,
    title: string
    status: boolean
}