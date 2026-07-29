import ProjectCard from "./projectCard";
import { use } from "react";
import { ProjectsContext } from "../context/projectContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { projectType } from "../types/project";


export default function ProjectsList() {

    const { data: projectData, isLoading, error } = useQuery(
        {
            queryKey: ["projects"],
            queryFn: async () => await fetch("http://localhost:3001/api/projects").then(res => res.json())
        }
    )
    console.log("log inside the projectgrid: ", projectData)

    const context = use(ProjectsContext);

    if (!context || !context.state) {
        throw new Error("ProjectsList must be used within a properly initialized ProjectProvider");
    }

    // const { projects } = context.state;

    // const {dispatch}=context
    // function demoProject(){
    //         dispatch({ type: "ADD_PROJECT", payload: {
    //     id: crypto.randomUUID(),
    //     name: "abc",
    //     summary: "abc",
    //     domain: "abc",
    //     techStack: ["abc", "def"],
    //     completion: 0,
    //     features: [{
    //         id:crypto.randomUUID(),
    //         title: "abc",
    //         status: false,
    //         tasks: [{
    //             id:crypto.randomUUID(),
    //             title: "abc",
    //             status: false
    //         },
    //         {
    //             id:crypto.randomUUID(),
    //             title: "def",
    //             status: false
    //         },
    //         {
    //             id:crypto.randomUUID(),
    //             title: "ghi",
    //             status: false
    //         }]
    //     },
    //     {
    //         id:crypto.randomUUID(),
    //         title: "generational lockin",
    //         status: false,
    //         tasks: [{
    //             id:crypto.randomUUID(),
    //             title: "activating lockin mode",
    //             status: false
    //         },
    //         {
    //             id:crypto.randomUUID(),
    //             title: "def",
    //             status: false
    //         },
    //         {
    //             id:crypto.randomUUID(),
    //             title: "ghi",
    //             status: false
    //         }]
    //     }]
    // } })
    // }

    // if (isLoading) return <div><h1>loading projects</h1></div>
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