import { Link } from "react-router-dom";
import type { projectType } from "../types/project";
import { MyProgress } from "./ProgressBar";
import { use } from "react";
import { ProjectsContext } from "../context/projectContext";

export default function ProjectCard({ project }: { project: projectType }) {

    const context = use(ProjectsContext);

    if (!context || !context.state) {
        throw new Error("ProjectsList must be used within a properly initialized ProjectProvider");
    }

    const { dispatch } = context;

    const handleDeleteClick = (e: React.MouseEvent) => {
        // 1. Prevent the Link component from navigating
        e.preventDefault();
        // 2. Prevent the click from bubbling up to the Link
        e.stopPropagation();

        // 3. Production safety check
        const confirmDelete = window.confirm(`Are you sure you want to delete "${project.name}"?`);
        if (confirmDelete) {
            dispatch({ type: "REMOVE_PROJECT", payload: { projectId: project.id } });
        }
    };

    return (
        <Link to={`/projectDetail/${project.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{
                padding: "15px",
                margin: "5px",
                border: "1px solid #ccc",
                borderRadius: 10,
                position: "relative", // Required to position the close button absolutely
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>

                {/* Clean, Accessible Delete Button */}
                <button
                    onClick={handleDeleteClick}
                    aria-label={`Delete ${project.name}`}
                    className="deleteButton"
                    // Quick hover effect for production polish
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "red";
                        e.currentTarget.style.backgroundColor = "#fff5f5";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#999";
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    &times;
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10px", paddingRight: "20px" }}>
                    <h2 style={{ margin: "0 0 10px 0", fontSize: "1.25rem" }}>{project.name}</h2>
                    <MyProgress completion={project.completion} />
                </div>
                <p style={{ margin: 0, color: "#555" }}>summary: {project.summary}</p>
            </div>
        </Link>
    );
}