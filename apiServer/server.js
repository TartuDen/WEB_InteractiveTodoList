import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';
import { createUserTable, createTasksTable } from './createTables.js';


const app = express();
const port = 8081;
export const pool = new pg.Pool({
    user: 'dverves',
    host: 'localhost',
    database: 'to_do_list',
    password: '123',
    port: 5432,
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let user = {
    id: 1,
    name: "Den",
    email: "den@ver.com",
    ava: ""
}

let tasks = [
    // Today's tasks
    {
        id: 1,
        date: "2024-04-15",
        userID: 1,
        taskInfo: [{
                description: "Study",
                importance: "high",
            },
            {
                description: "Play with kids",
                importance: "medium",
            },
            {
                description: "Watch movie with Alina",
                importance: "high",
            }
        ]
    },
    // Tomorrow's tasks
    {
        id: 2,
        date: "2024-04-16",
        userID: 1,
        taskInfo: [{
                description: "Go to the gym",
                importance: "medium",
            },
            {
                description: "Do grocery shopping",
                importance: "high",
            },
            {
                description: "Work on project proposal",
                importance: "high",
            },
            {
                description: "Call mom",
                importance: "low",
            }
        ]
    },
    // Day after tomorrow's tasks
    {
        id: 3,
        date: "2024-04-17",
        userID: 1,
        taskInfo: [{
                description: "Attend meeting with team",
                importance: "high",
            },
            {
                description: "Visit dentist",
                importance: "high",
            },
            {
                description: "Read book",
                importance: "low",
            },
            {
                description: "Prepare dinner",
                importance: "medium",
            }
        ]
    },
    // Empty day
    {
        id: 4,
        date: "2024-04-18",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 5,
        date: "2024-04-19",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 6,
        date: "2024-04-20",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 7,
        date: "2024-04-21",
        userID: 1,
        taskInfo: []
    }
];
// Call the function to create the user table
createUserTable();

createTasksTable();

async function insertTasks(pool, tasks) {
    const client = await pool.connect();
    try {
        for (const task of tasks) {
            const { id, date, userID, taskInfo } = task;
            await client.query(`
                INSERT INTO tasks (id, date, userID, taskInfo)
                VALUES ($1, $2, $3, $4)
            `, [id, date, userID, taskInfo]);
        }
        console.log("Tasks inserted successfully.");
    } catch (error) {
        console.error("Error inserting tasks:", error);
    } finally {
        client.release();
    }
}

// insertTasks(pool, tasks)

async function getUserTasks(user) {
    const client = await pool.connect();
    try {
        // SQL query to select tasks for the given user
        const queryText = 'SELECT * FROM tasks WHERE "userid" = $1';
        const queryParams = [user.id];
        
        // Execute the query
        const result = await client.query(queryText, queryParams);
        
        // Adjust dates for time zone difference (add 3 hours for Tallinn timezone)
        const tasksWithAdjustedDates = result.rows.map(task => {
            const adjustedDate = new Date(task.date);
            adjustedDate.setHours(adjustedDate.getHours() + 3); // Add 3 hours
            return { ...task, date: adjustedDate };
        });
        
        // Return the tasks with adjusted dates
        console.log(tasksWithAdjustedDates);
        return tasksWithAdjustedDates;
    } catch (error) {
        console.error('Error retrieving tasks for user:', error);
        throw error; // Throw the error to handle it in the calling function
    } finally {
        client.release(); // Release the client back to the pool
    }
}


app.get("/api/v01",async(req,res)=>{
    const { user } = req.query;
    let tasks = await getUserTasks(user);
    // console.log(tasks);
    res.status(200).json({tasks, user});
})

app.listen(port,(err)=>{
    if (err) throw err;
    console.log("API Server is running on port: "+port)
})