import { ProjectsContext } from "../context/projectContext"
import { use } from "react"
import { useParams } from "react-router-dom"
import FeatureList from "./FeatureList"

export default function ProjectDetails() {
    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state } = context
    
    const { projectId } = useParams()
    
    const ThisProject = state.projects.find((project) => project.id === projectId)
    return (
        <>
            <h1>Project Detail</h1>
            {
                ThisProject ? (
                    <>
                        <h1>{ThisProject.name}</h1>
                        <p><h2>Summary:</h2>{ThisProject.summary}</p>
                        <p><h2>Domain:</h2>{ThisProject.domain}</p>
                        <p><h2>Tech Stack:</h2>{ThisProject.techStack}</p>
                        <p><h2>Completion:</h2>{ThisProject.completion}%</p>
                        {FeatureList(ThisProject)}
                    </>
                ) :
                    <h2>
                        Theres no project detail !
                    </h2>
            }
        </>
    )
} 