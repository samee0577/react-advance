import { Link } from "react-router-dom";
import type { projectType } from "../types/project";
import { MyProgress } from "./ProgressBar";

export default function ProjectCard({ project }: { project: projectType }) {
    return (
        <Link to={`/projectDetail/${project.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ padding: "10px", margin: "5px", border: "1px solid black", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>name: {project.name}</h2>
                    <MyProgress total={project.features.length} done={project.completion} />
                </div>
                <p>summary: {project.summary}</p>
            </div>
        </Link>
    )
}

