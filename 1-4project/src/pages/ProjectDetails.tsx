import { ProjectsContext } from "../features/projects/context/Context"
import { use } from "react"
import { useParams } from "react-router-dom"

export default function ProjectDetail() {

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state } = context

    const { projectId } = useParams()

    const ThisProject = state.projects.find((project) => project.id === projectId)
    console.table(state.projects)
    return (
        <>
            <h1>Project Detail</h1>
            {
                ThisProject && (
                    <>
                        <h1>{ThisProject.name}</h1>
                        <p><h2>Summary:</h2>{ThisProject.summary}</p>
                        <p><h2>Domain:</h2>{ThisProject.domain}</p>
                        <p><h2>Completion:</h2>{ThisProject.completion}%</p>
                        <h2>Features:</h2>
                        {ThisProject.features.map(feature => <li>{feature}</li>)}
                    </>
                )
            }
        </>
    )
}