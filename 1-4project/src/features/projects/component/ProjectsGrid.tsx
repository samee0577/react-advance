import ProjectCard from "./projectCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { projectType } from "../types/project";


export default function ProjectsList() {

    const [isOffline, setIsOffline] = useState<boolean>(() => !navigator.onLine)

    useEffect(() => {
        const handleOnline = () => setIsOffline(false)
        const handleOffline = () => setIsOffline(true)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])


    const { data: projectData, isLoading, error } = useQuery(
        {
            queryKey: ["projects"],
            queryFn: async () => {
                if (!navigator.onLine) {
                    throw new Error("NETWORK_OFFLINE")
                }
                const res = await fetch("http://localhost:3001/api/projects").then(res => res.json())  
                return res.json() 
            }
        }
    )
    
    const hasNetworkError = isOffline ||
        (error instanceof Error && (
            error.message === "NETWORK_OFFLINE" ||
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ))

    if (hasNetworkError) {
        return (
            <div style={{
                minHeight: "60vh",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                padding: "24px"
            }}>
                <div>
                    <h2>No network connection</h2>
                    <p>Please check your internet connection and try again.</p>
                    <button className="allButton" onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        )
    }
    if (error) return <div><h1>{error.message}</h1></div>

    return (
        <div>
            <h1>Projects</h1>
            <Link to="/newProject">
                <button style={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: 10, cursor: "pointer" }}>
                    Add New Project
                </button>
            </Link>
            {/* <button onClick={demoProject} style={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: 10, cursor: "pointer" , backgroundColor:"red"}}>
                    demo project [temp button]
                </button> */}

            {isLoading ? <h1>loading projects</h1> :

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
                    {projectData.map((project: projectType) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            }
        </div>
    );
}