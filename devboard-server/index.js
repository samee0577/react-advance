import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;
const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, title: "hello world" },
];

app.get("/api/projects", (req, res) => {
    res.json(projects);
})

app.post("/api/projects", (req, res) => {
    const newProjects = {id : projects.length +1 , ...req.body};
    projects.push(newProjects);
    res.json(newProjects);
})

app.listen(port, ()=>{
    console.log("server is listening on port:" , port)
});