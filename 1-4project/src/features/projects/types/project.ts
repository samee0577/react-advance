export type action = 
    {type: "ADD_PROJECT" , payload: projectType} |
    {type: "REMOVE_PROJECT", payload?: any}

export interface projectType {
    name: string,
    summary: string,
    domain: string,
    completion: number,
    features: string[]
}