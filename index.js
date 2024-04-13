import express from 'express';
import bodyParser from 'body-parser';
import { describe } from 'node:test';

const app = express();
const port = 8080;

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
        date: "13.05.2024",
        userID: 1,
        taskInfo: [{
                description: "Study",
                importance: "high",
            },
            {
                description: "Play with kids",
                importance: "high",
            },
            {
                description: "Watch movie with Alina",
                importance: "high",
            },
            {
                description: "Walk the dog",
                importance: "low",
            }
        ]
    },
    // Tomorrow's tasks
    {
        id: 2,
        date: "14.05.2024",
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
        date: "15.05.2024",
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
        date: "16.05.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 5,
        date: "17.05.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 6,
        date: "18.05.2024",
        userID: 1,
        taskInfo: []
    },
    // Empty day
    {
        id: 7,
        date: "19.05.2024",
        userID: 1,
        taskInfo: []
    }
];




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.status(200).render("index.ejs",{user, tasks})
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log("Proxy Server is running on port "+port)
})