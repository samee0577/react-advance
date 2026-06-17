import { ProjectsContext } from "../context/projectContext"
import { use } from "react"
import { useParams } from "react-router-dom"
import FeatureList from "./FeatureList"
import StackList from "./TechList"
import { MyProgress } from "./ProgressBar"

export default function ProjectDetails() {
    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state } = context

    const { projectId } = useParams()
    const ThisProject = state.projects.find((project) => project.id === projectId)



    return (
        <>
            {
                ThisProject ? (
                    <div className="project-grid-container">
                        <div style={{ borderRight: "1px solid #999", paddingRight: "20px", marginRight: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h1>{ThisProject.name}</h1>
                                <MyProgress completion={ThisProject.completion} />
                            </div>
                            <h2 style={{ marginTop: "0px", fontWeight: "400" }}>{ThisProject.domain}</h2>
                            <h2>Summary:</h2>{ThisProject.summary}
                            <StackList techStack={ThisProject.techStack} />
                        </div>
                        <div>
                            <FeatureList ThisProject={ThisProject} />
                            <button className="allButton" style={{ marginTop: "10px", width: "100%" }}>Add New Feature</button>
                        </div>
                    </div >
                ) :
                    <h2>
                        Theres no project detail !
                    </h2>
            }
        </>
    )


} 