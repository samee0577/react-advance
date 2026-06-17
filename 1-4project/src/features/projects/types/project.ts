export type action =
    { type: "ADD_PROJECT", payload: projectType } |
    { type: "REMOVE_PROJECT", payload: { projectId: string } } |
    { type: "TOGGLE_FEATURE", payload: { projectId: string, featureId: string } } |
    { type: "UPDATE_COMPLETION", payload: { projectId: string } } |
    { type: "ADD_TASK", payload: { projectId: string, tasks: string } } |
    { type: "DELETE_TASK", payload: { projectId: string, featureId: string } }

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