import { ProjectsContext } from "../context/Context"
import { toast } from "react-toastify"
import { use } from "react"


export function useAddProject() {
    
    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { dispatch } = context

    function addProjectAction(prevState: any, formData: FormData) {
        
        const featArray = formData.getAll('features') as Array<string>
        const cleanedFeatures = featArray.filter(feat => feat.trim() !== '')

        const project = {
            name: formData.get('name') as string,
            summary: formData.get('summary') as string,
            domain: formData.get('domain') as string,
            completion: 0,
            features: cleanedFeatures
        }

        if (project.name.trim() === '' || project.features.length < 1 || project.summary.trim() === '' || project.domain.trim() === '') return toast.error("Please fill all the fields")

        try {
            dispatch({ type: "ADD_PROJECT", payload: project })
            toast.success("Project created successfully")
        } catch (error) {
            toast.error("Error creating project")
        }
        return project
    }

    return addProjectAction
}

