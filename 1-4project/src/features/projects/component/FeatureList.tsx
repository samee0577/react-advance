import type { projectType } from "../types/project";
import { toast, ToastContainer } from "react-toastify";
import "../../../index.css"
import { FeatureItem } from "./FeatureItem";

export default function FeatureList({ ThisProject }: { ThisProject: projectType }) {
    return (
        <>
            <h2>Tasks:</h2>
            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {ThisProject?.features.map((feature) =>
                    <FeatureItem feature={feature} ThisProjectId={ThisProject.id} onDeleteSuccess={() => {toast.success("Feature deleted successfully")}} key={feature.id} />
                )}
            </div>
            <ToastContainer />
        </>
    )
}