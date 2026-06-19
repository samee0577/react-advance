import { ProjectsContext } from "../context/projectContext"
import { use, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import FeatureList from "./FeatureList"
import StackList from "./TechList"
import { MyProgress } from "./ProgressBar"
import { toast } from "react-toastify"

export default function ProjectDetails() {

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state, dispatch } = context

    const { projectId } = useParams()
    const ThisProject = state.projects.find((project) => project.id === projectId)

    const [task, setTask] = useState<string>("")

    function handleAddNew(task: string) {
        if (ThisProject === undefined) return
        if (task.trim() === '') return

        try {
            dispatch({ type: "ADD_TASK", payload: { projectId: ThisProject.id, task: task } })
            dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProject.id } })
            setTask("")
            toast.success("Task added successfully")
            setIsOpen(false)
        } catch (error) {
            toast.error("Error adding task");
        }
    }

    function handleEdit() {
        if (ThisProject === undefined) return
        dispatch({ type: "EDIT_PROJECT", payload: { projectId: ThisProject.id, newName: "edit", newSummary: "edit", newDomain: "edit", newTechStack: ["edit"] } })
        toast.success("Project edited successfully")
    }
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <>
            {
                ThisProject ? (
                    <div className="project-grid-container">
                        <div style={{ borderRight: "1px solid #999", paddingRight: "20px", marginRight: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <h1 style={{ width: "auto" }}>{ThisProject.name}</h1>
                                    <button className="edit" onClick={handleEdit}>Edit</button>
                                </div>
                                <MyProgress completion={ThisProject.completion} />
                            </div>
                            <h2 style={{ marginTop: "0px", fontWeight: "400" }}>{ThisProject.domain}</h2>
                            <h2>Summary:</h2>{ThisProject.summary}
                            <StackList techStack={ThisProject.techStack} />
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <FeatureList ThisProject={ThisProject} />
                            <button className="allButton" style={{ marginTop: "10px", width: "100%" }} onClick={() => setIsOpen(true)}>Add New Task</button>
                            <dialog ref={dialogRef} className="popup" onClose={() => setIsOpen(false)} >
                                <form method="dialog" onSubmit={(e) => { e.preventDefault(); handleAddNew(task) }}>
                                    <h2>Add a New Task</h2>
                                    <input
                                        type="text"
                                        value={task}
                                        className="popup-input"
                                        placeholder="Enter Task"
                                        onChange={(e) => setTask(e.target.value)}
                                    />

                                    <div className="popup-actions">
                                        <button className="popup-btn-primary" type="submit" onClick={() => handleAddNew(task)}>
                                            Add Task
                                        </button>
                                        <button className="popup-btn-secondary" type="button" onClick={() => setIsOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </dialog>
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