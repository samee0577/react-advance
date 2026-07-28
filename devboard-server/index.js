import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Pool from "pg-pool";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;
// const projects = [
//     { id: 1, name: "Project 1", summary: "loren djsd have bu anfkjsaf need a  fkjf lasklwi never . ", domain: "example.com", techStack: ["React", "TypeScript"], completion: 0, features: [{ id: 1, title: "Feature lmno", tasks: ["Task 1", "Task 2"] }] },
//     { id: 2, name: "uhjdfbdhf", summary: "nothing", domain: "example.com", techStack: ["React", "TypeScript"], completion: 0, features: [{ id: 1, title: "Feature 1", tasks: ["Task stfu", "Task lol"] }] },
// ];

const { PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PGSSLMODE,
    PGCHANNELBINDING } = process.env;

const pool = new Pool({
    database: PGDATABASE,
    host: PGHOST,
    port: 5432,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

app.get("/api/projects", async (req, res) => {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query("SELECT * FROM projects");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: error.message });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// db connection check 
app.get("/api/db-health", async (req, res) => {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query("SELECT NOW() as current_time");
        res.json({
            ok: true,
            message: "Database connection successful",
            currentTime: result.rows[0].current_time
        });
    } catch (error) {
        console.error("Database health check failed:", error);
        res.status(500).json({
            ok: false,
            message: "Database connection failed",
            error: error.message
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// app.post("/api/projects", (req, res) => {
//     projects.push(req.body);
//     res.json(req.body);
// })

app.listen(port, () => {
    console.log("server is listening on port:", port)
});