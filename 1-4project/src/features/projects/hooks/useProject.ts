import { useReducer } from 'react';
import type { action, projectType } from '../types/project';

function reducerFunction(state: { projects: projectType[] }, action: action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case 'TOGGLE_FEATURE':
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload) {
                        return {
                            //fix this later
                            ...project,
                            completion: project.completion === 0 ? 1 : 0,
                        };
                    }
                    return project;
                }),
            }
        default:
            return state
    }
}

export default function useProject() {
    const [state, dispatch] = useReducer(reducerFunction, {
        projects: [{
            id: crypto.randomUUID(),
            name: "dev board",
            summary: "summary1",
            domain: "domain1",
            completion: 1,
            features: [
                { id: crypto.randomUUID(), title: "feature1", status: true },
                { id: crypto.randomUUID(), title: "feature2", status: false },
                { id: crypto.randomUUID(), title: "feature3", status: false }
            ]
        }] as projectType[]
    })
    return { state, dispatch }
}
