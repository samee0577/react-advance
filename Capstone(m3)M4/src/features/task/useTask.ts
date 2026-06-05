/*this file right here is for the reducer function , types and usetask
export from here to index then import and use the state and dispatch from anywhere*/
import { useEffect, useReducer } from "react"

interface Task {
    id: number,
    text: string,
    done: boolean
}

type context = { state: { tasks: Task[] }, dispatch: React.Dispatch<action> }

type action =
    | { type: 'ADD_TASK', payload: string }
    | { type: 'REMOVE_TASK', payload: number }
    | { type: "TOGGLE_TASK", payload: number }

function reducerFunction(state: { tasks: Task[] }, action: action) {
    if (action.type === 'ADD_TASK') {
        return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.payload, done: false }] }
    }
    if (action.type === 'REMOVE_TASK') {
        return { ...state, tasks: state.tasks.filter((t: Task) => t.id !== action.payload) }
    }
    if (action.type === "TOGGLE_TASK") {
        return { ...state, tasks: state.tasks.map((t: Task) => t.id === action.payload ? { ...t, done: !t.done } : t) }
    }
    return state
}

function useTask() {
    const [state, dispatch] = useReducer(reducerFunction, { tasks: JSON.parse(localStorage.getItem("tasks") || "[]") })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
    }, [state.tasks])

    return { state, dispatch }
}

export type { Task ,action, context }
export default useTask