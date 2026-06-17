import { useEffect, useReducer } from 'react';
import type { action, projectType } from '../types/project';

function reducerFunction(state: { projects: projectType[] }, action: action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case 'REMOVE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter((project) => project.id !== action.payload.projectId)
            };
        case 'TOGGLE_FEATURE':
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            features: project.features.map((feature) => {
                                if (feature.id === action.payload.featureId) {
                                    return {
                                        ...feature,
                                        status: !feature.status,
                                    };
                                }
                                return feature;
                            })
                        };
                    }
                    return project;
                })
            };
        case "UPDATE_COMPLETION":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            completion: Math.floor((project.features.filter((feature) => feature.status).length / project.features.length) * 100),
                        };
                    }
                    return project;
                })
            };
        case "ADD_TASKS":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            features: [...project.features, action.payload.tasks.map((task) => {
                                return {
                                    id: crypto.randomUUID(),
                                    title: task,
                                    status: false
                                }
                            })]
                        };
                    }
                    return project;
                })
            }
        default:
            return state
    }
}

export default function useProject() {
    const [state, dispatch] = useReducer(reducerFunction, { projects: JSON.parse(localStorage.getItem("projects") || "[]") })

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(state.projects))
        console.table(state.projects)
    }, [state.projects])

    return { state, dispatch }
}
