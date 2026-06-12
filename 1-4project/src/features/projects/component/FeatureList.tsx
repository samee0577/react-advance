import type { projectType } from "../types/project";


function handleToggle() {
    return () => {
        
    }
}

export default function featureList(ThisProject: projectType) {
    return (
        <>
            <h2>Features:</h2>
            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {ThisProject?.features.map((features) => <button className="features" key={features.id} onClick={handleToggle} >{features.title}</button>)}
            </div>
        </>
    )
}