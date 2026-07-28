import ProjectCard from "./projectCard";
import { use } from "react";
import { ProjectsContext } from "../context/projectContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


export default function ProjectsList() {

    const {data , isLoading , error} =useQuery(
        {
            queryKey:["projects"],
            queryFn: ()=> fetch("http://localhost:3001/api/projects").then(res=>res.json())
        }
    )
    console.log("log inside the projectgrid: ",data)

    const context = use(ProjectsContext);
    
    if (!context || !context.state) {
        throw new Error("ProjectsList must be used within a properly initialized ProjectProvider");
    }

    const { projects } = context.state;

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
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </div>
    );
}