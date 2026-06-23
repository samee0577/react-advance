import { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ProjectsContext } from "../context/projectContext";
import type { feature } from "../types/project";
import useDialog from "../hooks/useDialog";


export function FeatureItem({ feature, ThisProjectId }: { feature: feature; ThisProjectId: string; }) {


    const context = use(ProjectsContext);
    if (!context) throw new Error("useProject must be used within a ProjectProvider");
    const { dispatch } = context;


    function handleToggle(taskId: string) {
        try {
            dispatch({
                type: "TOGGLE_TASK",
                payload: { projectId: ThisProjectId, featureId: feature.id, taskId: taskId }
            })
        } catch (error) {
            toast.error("Error toggling feature");
        }
    }

    function handleDeleteClick(featureId: string) {
        try {
            dispatch({ type: "DELETE_FEATURE", payload: { projectId: ThisProjectId, featureId: featureId } });
            dispatch({ type: "UPDATE_COMPLETION", payload: { projectId: ThisProjectId } });
            toast.success("Feature deleted successfully");
        } catch (error) {
            toast.error("Error deleting feature");
        }
    }

    const { dialogRef, openDialog, closeDialog } = useDialog();
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div style={{alignSelf:"start"}}>
            <div style={{ position: "relative", height: "100%" }}>
                <button
                    onClick={openDialog}
                    aria-label={`Delete ${feature.title}`}
                    className="deleteButton"
                    // Quick hover effect for production polish
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "red";
                        e.currentTarget.style.backgroundColor = "#fff5f5";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#999";
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    &times;
                </button>
                <div className="feature-wrapper">
                    <button
                        className="features"
                        onClick={() => setIsExpanded(!isExpanded)}
                        data-status={feature.status ? "true" : "false"}
                    >
                        {feature.title}
                    </button>
                    {isExpanded && (
                        <div className="tasks-container">
                            {feature.tasks.map((task) => (
                                <button
                                    key={task.id}
                                    className="task-item"
                                    data-status={task.status ? "true" : "false"}
                                    onClick={() => handleToggle(task.id)}
                                >
                                    {task.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <dialog ref={dialogRef} className="popup">
                <h2>Are you sure you want to delete {feature.title}?</h2>
                <div className="popup-actions">
                    <button className="popup-btn-primary" onClick={() => handleDeleteClick(feature.id)}>
                        Delete Task
                    </button>
                    <button className="popup-btn-secondary" onClick={closeDialog}>
                        Close
                    </button>
                </div>
            </dialog>
            <ToastContainer />
        </div>
    );
}
