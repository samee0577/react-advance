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

app.post("/api/projects", async (req, res) => {
    let client;

    try {
        client = await pool.connect();
        const { name, summary, domain, completion } = req.body;
        const { features } = req.body;

        await client.query("BEGIN")

        const projectResult = await client.query(`INSERT INTO projects (name, summary, domain, completion) VALUES ($1, $2, $3, $4) returning id;`, [name, summary, domain, completion]);
        const projectId = projectResult.rows[0].id;

        for (const feature of features) {
            const featureResult = await client.query(
                `INSERT INTO features (title, status, project_id) VALUES ($1, $2, $3) RETURNING id;`,
                [feature.title, false, projectId]
            );

            const featureId = featureResult.rows[0].id;

            for (const task of feature.tasks) {
                await client.query(
                    `INSERT INTO tasks (title, status, feature_id) VALUES ($1, $2, $3);`,
                    [task.title, false, featureId]
                );
            }
        }
        await client.query("COMMIT")

        res.json({ message: "project added successfully", projectId });

    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error.message)
        res.status(500).json({ error: error.message });
    } finally {
        client.release()
    }

    // projects.push(req.body);
    // res.json(req.body);
});

app.listen(port, () => {
    console.log("server is listening on port:", port)
});