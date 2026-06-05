/* this here is the reducer function file (state logic) for the setting feature 
exports to index then can import from anywhere*/

import type { ReactNode } from "react";
import { createContext, useReducer } from "react";

type context = {
    state: { language: string },
    dispatch: React.Dispatch<{ type: "TOGGLE_LANG"; payload: string }>
}
function reducerFunc(prevState: { language: string }, action: { type: "TOGGLE_LANG", payload: string }) {
    if (action.type === "TOGGLE_LANG") return {
        language: action.payload.toUpperCase() === "EN" ? "FR" : "EN"
    }
    return prevState
}

export const SettingContext = createContext<context | null>(null);

export function SettingProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(reducerFunc, { language: "EN" })

    return (
        <SettingContext.Provider value={{ state, dispatch }}>
            {children}
        </SettingContext.Provider>
    )
}