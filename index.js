import express from 'express';
import bodyParser from 'body-parser';
import { describe } from 'node:test';
import axios from 'axios';
import { isToday, isTomorrow } from './helperFuncs.js';

const app = express();
const port = 8080;
const apiURL = "http://localhost:8081/api/v01"

let user = {
    id: 1,
    name: "Den",
    email: "den@ver.com",
    ava: ""
}

async function getData(){
    try{
        const apiResp = await axios.get(apiURL, { params: { user } });
        return apiResp.data.tasks
    }catch(err){
        console.error("Failed to retrieve data getData(), error: "+err);
    }
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function updateTasks(tasks, today, user) {
    console.log(today);
    // Find the index of the task corresponding to today's date
    const index = tasks.findIndex(task => task.date.slice(0, 10) === today);

    // If a task for today is found
    if (index !== -1) {
        // Remove all tasks before today
        tasks = tasks.slice(index);
    } else {
        // If no task for today is found, create empty tasks for the remaining days
        const lastDate = tasks[tasks.length - 1].date; // Get the last date in the tasks array
        const lastDateTime = new Date(lastDate).getTime(); // Convert last date to milliseconds

        // Loop to create tasks for the next 7 days
        for (let i = 1; i <= 7 - tasks.length; i++) {
            const nextDate = new Date(lastDateTime + i * 24 * 60 * 60 * 1000); // Add i days to the last date
            const formattedNextDate = nextDate.toISOString().slice(0, 10); // Format the next date as YYYY-MM-DD
            const emptyTask = {
                date: formattedNextDate,
                userID: user.id,
                taskInfo: []
            };
            tasks.push(emptyTask);
        }
    }
    console.log("*************");
    console.log(tasks);
    return tasks;
}




app.get("/", async (req, res) => {
    let today = isToday();
    let tomorrow = isTomorrow();
    let tasks = await getData();
    tasks = updateTasks(tasks, today, user);
    res.status(200).render("index.ejs", { user, tasks, today, tomorrow })
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Proxy Server is running on port " + port)
})