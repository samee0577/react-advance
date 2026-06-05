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
        <div>
            <h1>Projects</h1>
            <Link to="/newProject">
                <button>
                    Add Ew Project
                </button>
            </Link>
            <div>
                {projects.map((project) => (
                    <ProjectCard project={project} />
                ))}
            </div>
        </div>
    )
}  