import type { Engineer } from "./type";
import StatusBadge from "./StatusBadge";

function EngineerCard({ id, status, name, role, skills }: Engineer) {
    return (
        <div style={{ border: "1px solid black", borderRadius: "5px", margin: "10px", padding: "20px", width: "200px" }}>
            <StatusBadge status={status} />
            <h1>Name: {name}</h1>
            <p>Role: {role}</p>
            <p>ID: {id}</p>
            {skills.length > 0 ?
                <h3>Skills: {skills.join(", ")}</h3>:
                <h3>Generalist</h3>
            }
        </div>
    )
}

export default EngineerCard;