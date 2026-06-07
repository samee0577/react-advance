import { ToastContainer } from "react-toastify"
import { useAddProject } from '../hooks/useAddProject';
import { useActionState } from "react"

export default function Form() {
    const addProjectAction = useAddProject()
    const [newProjectState, formAction, isPending] = useActionState(addProjectAction, { name: "", summary: "", domain: "", completion: 0, features: [] })

    return (
        <>
            <h1>Create New Project</h1>
            <form action={formAction}>
                <input name="name" placeholder="name" />
                <input name="summary" placeholder="summary" />
                <input name="domain" placeholder="domain" />
                <input name="features" placeholder="features" />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Project"}
                </button>
            </form>
            <ToastContainer position="bottom-left" autoClose={1000} />
        </>
    )
}