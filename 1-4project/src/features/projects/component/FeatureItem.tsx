import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { feature } from "../types/project";
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
    function handleToggle(taskId: number) {
        toggleTask(taskId)
    }

    function handleDeleteClick(featureId: number) {
        //api delete feature
        //api to update the completion as well after the delete
        // toast.success("Feature deleted successfully");
    }

    const { dialogRef, openDialog, closeDialog } = useDialog();
    const [isExpanded, setIsExpanded] = useState(false);


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
                    {isExpanded && (
                        <div className="tasks-container">
                            {feature.tasks.map((task) => (
                                <button
                                    key={task.id}
                                    className="task-item"
                                    data-status={task.status ? "true" : "false"}
                                    onClick={() => handleToggle(task.id)}
                                    disabled={isPending}>
                                    {
                                        isPending ? <div className="loader"></div> : task.title
                                    }
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
