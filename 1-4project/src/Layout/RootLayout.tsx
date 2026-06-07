import { Link, Outlet } from "react-router-dom"
import { use } from "react"
import {ProjectsContext}  from "../features/projects"

export default function RootLayout() {

    const context=use(ProjectsContext)
    const state=context?.state

    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider")
    }
    if (!state) {
        throw new Error("state is undefined")
    }

    return (
        <>
            <div><h1>DEVBOARD</h1></div>
            <nav>
                <span>Total Projects: {state.projects.length}</span>
                <br />
                <Link to="/">Dashboard</Link>
                <br />
                <Link to="/newProject">New Project</Link>
                <br />
                <Link to="/projectDetail">Project1</Link>
            </nav>
            <hr style={{ margin: 10}} />
            <Outlet />
        </>
    )
}