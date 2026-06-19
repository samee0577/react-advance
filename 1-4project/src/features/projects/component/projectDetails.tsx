import { ProjectsContext } from "../context/projectContext"
import { use, useState } from "react"
import { useParams } from "react-router-dom"
import FeatureList from "./FeatureList"
import StackList from "./TechList"
import { MyProgress } from "./ProgressBar"
import { toast } from "react-toastify"
import useDialog from "../hooks/useDialog"
import type { projectType } from "../types/project"

export default function ProjectDetails() {

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state, dispatch } = context

    const { projectId } = useParams()
    const ThisProject = state.projects.find((project) => project.id === projectId)

    const [task, setTask] = useState<string>("")
    const [editProject, setEditProject] = useState<projectType>({
        id: ThisProject?.id || "",
        name: ThisProject?.name || "",
        summary: ThisProject?.summary || "",
        domain: ThisProject?.domain || "",
        techStack: ThisProject?.techStack || [],
        completion: ThisProject?.completion || 0,
        features: ThisProject?.features || [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target

        setEditProject((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleTechStackChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTechStack = [...editProject.techStack]
        newTechStack[index] = e.target.value
        setEditProject({ ...editProject, techStack: newTechStack })
    }

    function handleAddNew(task: string) {
        if (ThisProject === undefined) return
        if (task.trim() === '') return

        try {
            dispatch({ type: "ADD_TASK", payload: { projectId: ThisProject.id, task: task } })
            dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProject.id } })
            setTask("")
            // toast.success("Task added successfully")
            closeDialog()
        } catch (error) {
            toast.error("Error adding task");
        }
    }

    function handleEdit() {
        if (ThisProject === undefined) return

        const nonEmptyTechStack = editProject.techStack.map((stack) => {
            if (stack.trim() === "") {
                setEditProject({ ...editProject, techStack: editProject.techStack.filter((s) => s !== "") });
            }
            return stack
        })

        try {
            dispatch({
                type: "EDIT_PROJECT",
                payload: {
                    projectId: ThisProject.id,
                    newName: editProject?.name || "",
                    newSummary: editProject?.summary || "",
                    newDomain: editProject?.domain || "",
                    newTechStack: nonEmptyTechStack || []
                }
            })
            closeEditDialog()
            // toast.success("Project edited successfully")
        } catch (error) {
            toast.error("Error editing project");
        }
    }

    function newStack() {
        setEditProject({ ...editProject, techStack: [...editProject.techStack, ""] })
    }

    const { dialogRef, openDialog, closeDialog } = useDialog();
    const { dialogRef: editDialogRef, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog();

    return (
        <>
            {
                ThisProject ? (
                    <div className="project-grid-container">
                        <div style={{ borderRight: "1px solid #999", paddingRight: "20px", marginRight: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <h1 style={{ width: "auto" }}>{ThisProject.name}</h1>
                                    <button className="edit" onClick={openEditDialog}>Edit</button>
                                    <dialog ref={editDialogRef} className="popup" onClose={closeEditDialog} >
                                        <form method="dialog" onSubmit={(e) => { e.preventDefault(); handleEdit() }}>
                                            <h2>Edit Project</h2>

                                            <label className="popup-label">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editProject?.name}
                                                className="popup-input"
                                                placeholder="Enter Project Name"
                                                onChange={handleInputChange}
                                            />

                                            <label className="popup-label">Domain</label>
                                            <input
                                                type="text"
                                                name="domain"
                                                value={editProject?.domain}
                                                className="popup-input"
                                                placeholder="Enter Project Domain"
                                                onChange={handleInputChange}
                                            />

                                            <label className="popup-label">Summary</label>
                                            <textarea
                                                name="summary"
                                                value={editProject?.summary}
                                                className="popup-input"
                                                style={{ minHeight: "100px" }}
                                                placeholder="Enter Project Summary"
                                                onChange={handleInputChange}
                                            />

                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "5px", marginRight: "10px" }}>
                                                <label className="popup-label">Tech Stack</label>
                                                <button type="button" onClick={newStack}>+</button>
                                            </div>

                                            {editProject.techStack.map((stack, index) => {
                                                return (
                                                    <input
                                                        className="popup-input"
                                                        key={index}
                                                        type="text"
                                                        value={stack}
                                                        placeholder="Enter Tech Stack"
                                                        onChange={handleTechStackChange(index)}
                                                    />
                                                )
                                            })}

                                            <div className="popup-actions" style={{ marginTop: "20px" }}>
                                                <button className="popup-btn-primary" type="submit" onClick={() => handleEdit()}>Save</button>
                                                <button className="popup-btn-secondary" type="button" onClick={closeEditDialog}>Cancel</button>
                                            </div>
                                        </form>
                                    </dialog>
                                </div>
                                <MyProgress completion={ThisProject.completion} />
                            </div>
                            <h2 style={{ marginTop: "0px", fontWeight: "400" }}>{ThisProject.domain}</h2>
                            <h2>Summary:</h2>{ThisProject.summary}
                            <StackList techStack={ThisProject.techStack} />
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <FeatureList ThisProject={ThisProject} />
                            <button className="allButton" style={{ marginTop: "10px", width: "100%" }} onClick={openDialog}>Add New Task</button>
                            <dialog ref={dialogRef} className="popup" onClose={closeDialog} >
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
                                        <button className="popup-btn-secondary" type="button" onClick={closeDialog}>
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
