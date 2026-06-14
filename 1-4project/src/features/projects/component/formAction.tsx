import { ToastContainer } from "react-toastify"
import { useAddProject } from '../hooks/useAddProject';
import { useActionState } from "react"
import { useState } from "react";

const inputStyle = {
    padding: "8px",
    fontSize: "18px",
    border: "1px solid black",
    borderRadius: 8,
    alighnSelf: "center"
}


export default function FormAction() {
    
    const addProjectAction = useAddProject()
    const [newProjectState, formAction, isPending] = useActionState(addProjectAction, null)
    const [featureArray, setArray] = useState<string[]>(["feature1"]);

    const handleAddFeature = () => {
        setArray([...featureArray, `${featureArray.length + 1}`]);
    }
    return (
        <>
            <form action={formAction} >
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px", marginBottom: "20px" }}>
                    
                    {/* inputs */}
                    <div style={{ paddingRight: "10px", display: "flex", flexDirection: "column", gap: "10px", borderRight: '1px solid #ccc' }}>
                        <label style={{ fontSize: "18px", marginTop: "10px" }}>Project Details</label>
                        <input style={inputStyle} name="name" placeholder="name" />
                        <input style={inputStyle} name="domain" placeholder="domain" />
                        <input style={inputStyle} name="techStack" placeholder="Tech-stack" />
                        <textarea style={{ ...inputStyle, height: "100px" }} name="summary" placeholder="summary" />
                    </div>

                    {/* features */}
                    <div  style={{ display: "flex", flexDirection: "column", gap: "10px", height: "fit-content" }}>
                        <label style={{ fontSize: "18px" }}>Features</label>
                        {featureArray.map((feature, index) => (
                            <div key={crypto.randomUUID()} style={{ display: "flex", gap: "5px" }}>
                                <h3>{index + 1 + "]"}</h3>
                                <input style={{ ...inputStyle, width: "100%" }} name="features" placeholder="features" />
                            </div>
                        ))}
                        <button style={{ marginTop: "10px", width: "100%", padding: "8px", fontSize: "18px", border: "1px solid black", borderRadius: 10 }} type="button" onClick={handleAddFeature}> Add More Features </button>
                    </div>
                </div>
                <button style={{ marginTop: "10px", width: "100%", padding: "10px", fontSize: "18px", border: "1px solid black", borderRadius: 10 }} type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Project"}
                </button>
            </form>
            <ToastContainer position="bottom-left" autoClose={1000} />
        </>
    )
}