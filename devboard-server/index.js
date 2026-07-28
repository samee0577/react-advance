import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;
const projects = [
    { id: 1, name: "Project 1",summary:"loren djsd have bu anfkjsaf need a  fkjf lasklwi never . ",domain:"example.com",techStack:["React","TypeScript"],completion:0,features:[{id:1,title:"Feature lmno",tasks:["Task 1","Task 2"]}]},
    { id: 2, title: "hello world", summary:"nothing" , domain:"example.com",techStack:["React","TypeScript"],completion:0,features:[{id:1,title:"Feature 1",tasks:["Task stfu","Task lol"]}]},
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