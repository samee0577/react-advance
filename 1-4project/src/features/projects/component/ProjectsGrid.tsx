import ProjectCard from "./projectCard";
import { use } from "react";
import { ProjectsContext } from "../context/Context";
import { Link } from "react-router-dom";


export default function ProjectsList() {

    const context = use(ProjectsContext)
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider")
    }

    const state = context?.state

    if (!state) {
        throw new Error("state is undefined")
    }
    const projects = state.projects

    return (
        <div >
            <h1>Projects</h1>
            <Link to="/newProject"  >
                <button style={{padding: "10px", margin: "10px", border: "1px solid black", borderRadius: 10}}>
                    Add Ew Project
                </button>
            </Link>
            <div style={{ display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",gap: "10px"}}>
                {projects.map((project) => (
                    <ProjectCard  key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}  