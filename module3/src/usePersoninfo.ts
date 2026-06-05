import { useReducer } from 'react'

type action =
    | { type: 'SET_NAME', payload: string }
    | { type: 'CLEAR_ALL' }
    | { type: 'SET_AGE', payload: number }

function reducerFunc(state: any, action: action) {
    if (action.type === 'SET_NAME') {
        return { ...state, name: action.payload }
    }
    if (action.type === 'CLEAR_ALL') {
        return { name: '', age: 0 }
    }
    if (action.type === "SET_AGE") {
        return { ...state, age: action.payload }
    }
    return state
}


function usePersoninfo() {
    const [state, dispatch] = useReducer(reducerFunc, { name: '', age: 0 })
    return { state, dispatch }
}

export default usePersoninfo;