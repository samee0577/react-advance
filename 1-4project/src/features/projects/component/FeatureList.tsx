import type { projectType } from "../types/project";
import { use } from "react"
import { ProjectsContext } from "../context/projectContext";
import { toast, ToastContainer} from "react-toastify";
import "../../../index.css"

export default function FeatureList({ThisProject}:{ThisProject: projectType}) {

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { dispatch } = context


    function handleToggle(featureId: string) {
        try {
            dispatch({ type: "TOGGLE_FEATURE", payload: { projectId: ThisProject.id, featureId: featureId } });
            dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProject.id } })
        } catch (error) {
            toast.error("Error toggling feature")
        }
    }

    return (
        <>
            <h2>Features:</h2>
            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {ThisProject?.features.map((features) => <button className="features" key={features.id} style={{ backgroundColor: features.status ? "rgba(46, 204, 113, 0.5)" : "rgba(128, 128, 128, 0.5)" }}
                    onClick={() => { handleToggle(features.id) }} >{features.title}</button>)}
            </div>
            <ToastContainer />
        </>
    )
}