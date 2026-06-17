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

    function handleAddNew(task: string) {
        if (ThisProject === undefined) return
        if (task.trim() === '') return
        dispatch({ type: "ADD_TASK", payload: { projectId: ThisProject.id, tasks: task } })
        dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProject.id } })
        setTask("")
        closepopup()
    }

    const dialogRef = useRef<HTMLDialogElement>(null)
    const openpopup = () => {
        dialogRef.current?.showModal()
    }
    const closepopup = () => {
        dialogRef.current?.close()
    }


    return (
        <>
            {
                ThisProject ? (
                    <div className="project-grid-container">
                        <div style={{ borderRight: "1px solid #999", paddingRight: "20px", marginRight: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h1>{ThisProject.name}</h1>
                                <MyProgress completion={ThisProject.completion} />
                            </div>
                            <h2 style={{ marginTop: "0px", fontWeight: "400" }}>{ThisProject.domain}</h2>
                            <h2>Summary:</h2>{ThisProject.summary}
                            <StackList techStack={ThisProject.techStack} />
                        </div>
                        <div style={{marginRight:"20px"}}>
                            <FeatureList ThisProject={ThisProject} />
                            <button className="allButton" style={{ marginTop: "10px", width: "100%" }} onClick={openpopup}>Add New Task</button>
                            <dialog ref={dialogRef} className="popup" onClose={closepopup} >
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
                                        <button className="popup-btn-secondary" type="button" onClick={closepopup}>
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