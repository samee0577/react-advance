import ProjectCard from "./projectCard";
import { use } from "react";
import { ProjectsContext } from "../context/projectContext";
import { Link } from "react-router-dom";


export default function ProjectsList() {
    const context = use(ProjectsContext);
    
    // Clean, combined production check
    if (!context || !context.state) {
        throw new Error("ProjectsList must be used within a properly initialized ProjectProvider");
    }

    const { projects } = context.state;
    
    return (
        <div>
            <h1>Projects</h1>
            <Link to="/newProject">
                <button style={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: 10, cursor: "pointer" }}>
                    Add New Project
                </button>
            </Link>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
                {projects.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                    />
                ))}
            </div>
        </div>
    );
}