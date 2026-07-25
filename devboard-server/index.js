import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

app.get("/api/projects", (req, res) => {
    res.json([
        { id: 1, name : "Project 1" , completion: 0},
        { id: 2, title: "hello world" , completion: 10},
    ]);
})

app.post("/api/projects", (req, res) => {
    console.log(req.body);
    res.json({message:"success"});
})

app.listen(port, ()=>{
    console.log("server is listening on port:" , port)
});