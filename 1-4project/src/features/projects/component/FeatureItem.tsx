import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { feature, task } from "../types/project";
import useDialog from "../hooks/useDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function FeatureItem({ feature, ThisProjectId }: { feature: feature; ThisProjectId: number; }) {

    const client = useQueryClient();
    const { mutate: toggleTask, isPending } = useMutation({
        mutationFn: async (taskID: number) => {
            await fetch(`http://localhost:3001/api/projects/toggleTask`, {
                method: "PUT",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ status: !feature.tasks.find(task => task.id === taskID)?.status, taskId: taskID ,featureId: feature.id, projectId: ThisProjectId})
            }).then(res => res.json())
        },  
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
            toast.error("Error toggling task status");
        }
    })

    const { mutate: deleteFeature, isPending: isPendingDelete } = useMutation({
        mutationFn: async (featureId: number) => {
            await fetch(`http://localhost:3001/api/projects/${ThisProjectId}/features/${featureId}`, {
                method: "DELETE",
                headers: { "content-Type": "application/json" }
            }).then(res => res.json())
        },  
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Feature deleted successfully",
                {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
            closeDialog();
        },
        onError: () => {
            closeDialog();
            toast.error("Error deleting feature");
        }
    })

    const { mutate: deleteTask, isPending: isPendingTaskDelete } = useMutation({
        mutationFn: async (taskId: number) => {
            await fetch(`http://localhost:3001/api/projects/features/${feature.id}/tasks/${taskId}`, {
                method: "DELETE",
                headers: { "content-Type": "application/json" }
            }).then(res => res.json())
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Task deleted successfully",
                {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
            closeTaskDialog();
            setTaskToDelete(null);
        },
        onError: () => {
            closeTaskDialog();
            setTaskToDelete(null);
            toast.error("Error deleting task");
        }
    })

    function handleToggle(taskId: number) {
        toggleTask(taskId)
    }

    function handleDeleteClick(featureId: number) {
        deleteFeature(featureId);
    }

    function handleTaskDeleteClick(taskId: number) {
        deleteTask(taskId);
    }

    const { dialogRef, openDialog, closeDialog } = useDialog();
    const { dialogRef: taskDialogRef, openDialog: openTaskDialog, closeDialog: closeTaskDialog } = useDialog();
    const [isExpanded, setIsExpanded] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<task | null>(null);


    return (
        <div style={{ alignSelf: "start" }}>
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
                    <div className={`tasks-container ${isExpanded ? "open" : ""}`}>
                        {feature.tasks.map((task) => (
                            <div key={task.id} className="task-item-wrapper">
                                <button
                                    className="task-item"
                                    data-status={task.status ? "true" : "false"}
                                    onClick={() => handleToggle(task.id)}
                                    disabled={isPending}>
                                    {task.title}
                                </button>
                                <button
                                    type="button"
                                    className="task-delete-button"
                                    aria-label={`Delete ${task.title}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTaskToDelete(task);
                                        openTaskDialog();
                                    }}
                                >
                                    🗑
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <dialog ref={dialogRef} className="popup">
                <h2>Are you sure you want to delete {feature.title}?</h2>
                <div className="popup-actions">
                    <button className="popup-btn-primary" onClick={() => handleDeleteClick(feature.id)}>
                        {isPendingDelete ? "Deleting...": "Delete feature"}
                    </button>
                    <button className="popup-btn-secondary" onClick={closeDialog}>
                        Close
                    </button>
                </div>
            </dialog>
            <dialog ref={taskDialogRef} className="popup">
                <h2>Are you sure you want to delete task "{taskToDelete?.title}"?</h2>
                <div className="popup-actions">
                    <button className="popup-btn-primary" onClick={() => taskToDelete && handleTaskDeleteClick(taskToDelete.id)}>
                        {isPendingTaskDelete ? "Deleting...": "Delete task"}
                    </button>
                    <button className="popup-btn-secondary" onClick={closeTaskDialog}>
                        Close
                    </button>
                </div>
            </dialog>
            <ToastContainer />
        </div>
    );
}
