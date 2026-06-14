import { Link } from "react-router-dom";
import type { projectType } from "../types/project";
import { MyProgress } from "./ProgressBar";

export default function ProjectCard({ project }: { project: projectType }) {
    return (
        <Link to={`/projectDetail/${project.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ padding: "10px", margin: "5px", border: "1px solid black", borderRadius: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10px" }}>
                    <h2>{project.name}</h2>
                    <MyProgress features={project.features} />
                </div>
                <p>summary: {project.summary}</p>
            </div>
        </Link>
    )
}

