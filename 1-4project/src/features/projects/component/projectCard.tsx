import { Link } from "react-router-dom";
import type { projectType } from "../types/project";
import { MyProgress } from "./ProgressBar";

export default function ProjectCard({ project }: { project: projectType }) {
    return (
        <Link to={`/projectDetail/${project.name}`} style={{ textDecoration: "none", color: "black" }}>
            <div>
                <h2>name: {project.name}</h2>
                <p>summary: {project.summary}</p>
                <MyProgress total={project.features.length} done={project.completion}/>
            </div>
        </Link>
    )
}

