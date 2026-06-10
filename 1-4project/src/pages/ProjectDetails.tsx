import {ProjectsContext} from "../features/projects/context/Context"
import { use } from "react"
import { useParams } from "react-router-dom"

export default function ProjectDetail(){

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state } = context

    const {projectId} =useParams()

    const ThisProject= state.projects.find((project) => project.id === projectId)
    console.table(state.projects)
    return (
        <>
        <h1>Project Detail</h1>
        {
            ThisProject && (
                <>
                <h1>{ThisProject.name}</h1>
                <p>{ThisProject.summary}</p>
                <p>{ThisProject.domain}</p>
                <p>{ThisProject.completion}%</p>
                <h2>Features: </h2>
                {ThisProject.features.map(feature => <li>{feature}</li>)}
                </>
            )
        }    
        </>
    )
}