import { type Engineer } from "./type";

interface StatusBadgeProps {
    status: Engineer["status"]
}

function StatusBadge({ status }: StatusBadgeProps) {
    
    console.log("status is", status)
    
    const colors = {
        available: "green",
        busy: "orange",
        offline: "red"
    }
    return (
        <span style={{ color: "white", fontSize: "14px", padding: "5px", border: `1px solid ${colors[status]}`, borderRadius: "25px", backgroundColor: `${colors[status]}` }}>
            - {status} <br />
        </span>
    )
}

export default StatusBadge;
