export type action =
    { type: "ADD_PROJECT", payload: projectType } |
    { type: "REMOVE_PROJECT", payload?: any } |
    { type: "TOGGLE_FEATURE", payload: { projectId: string, featureId: string } } |
    { type: "UPADTE_completion", payload: { projectId: string } }

export interface projectType {
    id: string,
    name: string,
    summary: string,
    techStack: string[],
    domain: string,
    completion: number,
    features: feature[]
}

export type feature = {
    id: string,
    title: string
    status: boolean
}