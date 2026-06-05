import type { ReactNode } from "react"
import { createContext } from "react";
import useTask from "./useTask"
import type { context } from "./useTask"

export const TaskContext = createContext<context | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {

    const { state, dispatch } = useTask()

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
};
