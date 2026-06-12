import { Link } from "react-router-dom"
import { use } from "react"
import { ProjectsContext } from "../context/Context"
import "../../../index.css"

export default function Navbar() {

    const context = use(ProjectsContext)
    const state = context?.state

    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider")
    }
    if (!state) {
        throw new Error("state is undefined")
    }

    return (
        <nav style={{margin:"5px"}}>
            <div><h1>DEVBOARD</h1></div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Link className="buttonStyle"  to="/">Dashboard</Link>
                <Link className="buttonStyle" to="/newProject">+ New Project</Link>
            </div>
            <span>Total Projects: {state.projects.length}</span>
        </nav>
    )

}