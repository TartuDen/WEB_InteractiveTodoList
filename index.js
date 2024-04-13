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
        task1: {
            description: "Study",
            importance: "high",
        },
        task2: {
            description: "Play with kids",
            importance: "high",
        },
        task3: {
            description: "Watch movie with Alina",
            importance: "high",
        },
        task4: {
            description: "Walk the dog",
            importance: "low",
        }
    },
    // Tomorrow's tasks
    {
        id: 2,
        date: "14.05.2024",
        task1: {
            description: "Go to the gym",
            importance: "medium",
        },
        task2: {
            description: "Do grocery shopping",
            importance: "high",
        },
        task3: {
            description: "Work on project proposal",
            importance: "high",
        },
        task4: {
            description: "Call mom",
            importance: "low",
        }
    },
    // Day after tomorrow's tasks
    {
        id: 3,
        date: "15.05.2024",
        task1: {
            description: "Attend meeting with team",
            importance: "high",
        },
        task2: {
            description: "Visit dentist",
            importance: "high",
        },
        task3: {
            description: "Read book",
            importance: "low",
        },
        task4: {
            description: "Prepare dinner",
            importance: "medium",
        }
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