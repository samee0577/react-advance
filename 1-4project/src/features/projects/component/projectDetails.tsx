import { ProjectsContext } from "../context/projectContext"
import { use, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import FeatureList from "./FeatureList"
import StackList from "./TechList"
import { MyProgress } from "./ProgressBar"

export default function ProjectDetails() {
    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state, dispatch } = context

    const { projectId } = useParams()
    const ThisProject = state.projects.find((project) => project.id === projectId)

    const [task, setTask] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function handleAddNew(task: string) {
        if (ThisProject === undefined) return
        if (task.trim() === '') return
        dispatch({ type: "ADD_TASK", payload: { projectId: ThisProject.id, tasks: task } })
        dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProject.id } })
        setTask("")
    }

    const dialogRef = useRef<HTMLDialogElement>(null)
    const openpopup = () => {
        setIsOpen(true)
        dialogRef.current?.showModal()
    }
    const closepopup = () =>{
        setIsOpen(false)
        dialogRef.current?.close()
    }


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
                            <button className="allButton" style={{ marginTop: "10px", width: "100%" }} onClick={openpopup}>Add New Feature</button>
                            {isOpen && <div className="popup-overlay">
                                <dialog ref={dialogRef} className="popup" open>
                                    <h2>Add a New Feature</h2>
                                    <input
                                        type="text"
                                        className="popup-input"
                                        placeholder="Enter feature"
                                        onChange={(e) => setTask(e.target.value)}
                                    />

                                    <div className="popup-actions">
                                        <button className="popup-btn-primary" onClick={() => handleAddNew(task)}>
                                            Add Feature
                                        </button>
                                        <button className="popup-btn-secondary" onClick={closepopup}>
                                            Close
                                        </button>
                                    </div>
                                </dialog>
                            </div>}
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