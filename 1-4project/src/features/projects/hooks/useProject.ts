import { useReducer } from 'react';
import type { action, projectType } from '../types/project';

function reducerFunction(state: {projects:projectType[]}, action: action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                projects:[...state.projects, action.payload]
            };
        default:
            return state
    }
}

export default function useProject() {
    const [state, dispatch] = useReducer(reducerFunction, { projects: [{
        name: "dev board",
        summary: "summary1",
        domain: "domain1",
        completion: 1,
        features: ["feature1", "feature2", "feature3"]
    }] as projectType[] })
    return { state, dispatch }
}
