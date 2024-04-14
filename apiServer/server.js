import bodyParser from 'body-parser';
import express from 'express';


const app = express();
const port = 8081;


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


app.get("/api/v01",(req,res)=>{
    let userData = req.body.user
    res.status(200).json({tasks, user})
})
app.listen(port,(err)=>{
    if (err) throw err;
    console.log("API Server is running on port: "+port)
})