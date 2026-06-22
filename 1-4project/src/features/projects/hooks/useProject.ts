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
                            features: project.features.map((f) => {
                                if (f.id === action.payload.featureId) {
                                    return {
                                        ...f,
                                        features: !f.status
                                    };
                                }
                                return f;
                            })
                        };
                    }
                    return project;
                })
            };
        case "ADD_TASK":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            features: [
                                ...project.features,
                                {
                                    id: crypto.randomUUID(),
                                    title: action.payload.task,
                                    status: false
                                }
                            ]
                        };
                    }
                    return project;
                })
            };
        case "DELETE_TASK":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            features: project.features.filter((feature) => feature.id !== action.payload.featureId)
                        };
                    }
                    return project;
                })
            };
        case "EDIT_PROJECT":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            name: action.payload.newName,
                            summary: action.payload.newSummary,
                            domain: action.payload.newDomain,
                            techStack: action.payload.newTechStack,
                        }
                    }
                    else {
                        return project
                    }
                })
            };
        case "TOGGLE_TASK":
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (project.id === action.payload.projectId) {
                        const changedFeature = project.features.map((feature) => {
                                if (feature.id === action.payload.featureId) {
                                    const toggledTask= feature.tasks.map((t) => t.id === action.payload.taskId ? { ...t, status: !t.status } : t);
                                    return {
                                        ...feature,
                                        tasks: toggledTask,
                                        status: toggledTask.every((t) => t.status)
                                    };
                                }
                                return feature;
                            });
                        console.log(changedFeature)
                        return {
                            ...project,
                            features: changedFeature,
                            completion: changedFeature.length === 0 ? 0 : Math.floor((changedFeature.filter((feature) => feature.status).length / changedFeature.length) * 100),
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
