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
        date: "13.04.2024",
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
        date: "14.04.2024",
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
        date: "15.04.2024",
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
        date: "16.04.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 5,
        date: "17.04.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 6,
        date: "18.04.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 7,
        date: "19.04.2024",
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
            // Convert date format from "DD.MM.YYYY" to "YYYY-MM-DD"
            const formattedDate = formatDate(date);
            await client.query(`
                INSERT INTO tasks (id, date, userID, taskInfo)
                VALUES ($1, $2, $3, $4)
            `, [id, formattedDate, userID, taskInfo]);
        }
        console.log("Tasks inserted successfully.");
    } catch (error) {
        console.error("Error inserting tasks:", error);
    } finally {
        client.release();
    }
}


function formatDate(date) {
    const [day, month, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}


insertTasks(pool, tasks)

app.get("/api/v01",(req,res)=>{
    let userData = req.body.user
    res.status(200).json({tasks, user})
})
app.listen(port,(err)=>{
    if (err) throw err;
    console.log("API Server is running on port: "+port)
})