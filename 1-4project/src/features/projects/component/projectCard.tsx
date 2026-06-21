import { Link } from "react-router-dom";
import type { projectType } from "../types/project";
import { MyProgress } from "./ProgressBar";
import { use } from "react";
import { ProjectsContext } from "../context/projectContext";
import useDialog from "../hooks/useDialog";

export default function ProjectCard({ project }: { project: projectType }) {

    const context = use(ProjectsContext);

    if (!context || !context.state) {
        throw new Error("ProjectsList must be used within a properly initialized ProjectProvider");
    }

    const { dispatch } = context;

    const { dialogRef, openDialog, closeDialog } = useDialog();

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        openDialog();
    };

    return (
        <>
            <dialog ref={dialogRef} className="popup">
                <p className="popupText">Are you sure you want to delete "{project.name}"?</p>
                <button type="button" className="popup-btn-primary" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeDialog();
                }}>Cancel</button>
                <button type="button" className="popup-btn-secondary" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch({ type: "REMOVE_PROJECT", payload: { projectId: project.id } });
                    closeDialog();
                }}>Delete</button>
            </dialog>

            <div style={{
                padding: "15px",
                margin: "5px",
                border: "1px solid #ccc",
                borderRadius: 10,
                position: "relative",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>

                {/* Clean, accessible delete button outside the link */}
                <button
                    type="button"
                    onClick={handleDeleteClick}
                    aria-label={`Delete ${project.name}`}
                    className="deleteButton"
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

                <Link to={`/projectDetail/${project.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10px", paddingRight: "20px" }}>
                        <h2 style={{ margin: "0 0 10px 0", fontSize: "1.25rem" }}>{project.name}</h2>
                        <MyProgress completion={project.completion} />
                    </div>
                    <p style={{ margin: 0, color: "#555" }}>summary: {project.summary}</p>
                </Link>
            </div>
        </>
    );
}