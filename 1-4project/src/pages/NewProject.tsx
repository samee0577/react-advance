import { ProjectsContext } from "../features/projects"
import { use } from "react"
import { ToastContainer, toast } from 'react-toastify';

export function NewProject() {

    const context = use(ProjectsContext)
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider")
    }
    const { dispatch } = context

    const projectDetails = {
        name: "vastekene hoyaa",
        summary: "summary1",
        domain: "domain1",
        completion: 0,
        features: ["feature1", "feature2"]
    }
    
    function handleAddProject() {
        try{
            dispatch({ type: "ADD_PROJECT", payload: projectDetails })
            // ("project added")
            toast.success('Project added!');
        }catch(error){
            console.error("Error adding project:", error)
        }
    }

    return (
        <>
            <h1>create new project</h1>
            <button onClick={handleAddProject}>
                Create Project
            </button>
            <ToastContainer position="bottom-left" autoClose={1000} />
        </>
    )
}