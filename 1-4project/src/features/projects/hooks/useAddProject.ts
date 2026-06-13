import { ProjectsContext } from "../context/Context"
import { toast } from "react-toastify"
import { use } from "react"

export function useAddProject() {
    
    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { dispatch } = context

    function addProjectAction(prevState: any, formData: FormData) {
        
        const features = formData.getAll('features') as Array<string>
        const featureObjArray = features.map(feature => ({ id: crypto.randomUUID(), title: feature, status: false }))
           
        const name = formData.get('name') as string
        const Name = name.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        
        const project = {
            id: crypto.randomUUID(),
            name: Name,
            summary: formData.get('summary') as string,
            domain: formData.get('domain') as string,
            completion: 0,
            features: featureObjArray,
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