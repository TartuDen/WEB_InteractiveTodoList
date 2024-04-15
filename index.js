import express from 'express';
import bodyParser from 'body-parser';
import { describe } from 'node:test';
import axios from 'axios';
import { isToday, isTomorrow } from './helperFuncs.js';
import { updateTasks } from './helperFuncs.js';

const app = express();
const port = 8080;
const apiURL = "http://localhost:8081/api/v01"

let user = {
    id: 1,
    name: "Den",
    email: "den@ver.com",
    ava: ""
}

async function getData(day = "all"){
    try{
        const apiResp = await axios.get(apiURL, { params: { user, day } });
        return apiResp.data.tasks
    }catch(err){
        console.error("Failed to retrieve data getData(), error: "+err);
    }
}


async function postNewTask(oneDayTask){
    try{
        let apiResp = await axios.post(apiURL+"/new_task",{oneDayTask});
        console.log(apiResp.data)
    }catch(err){
        console.error("Faild to postNewTask(oneDayTask), error: "+err);
    }
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/add-task", async (req, res) => {
    const { importance, description, day } = req.body;
    // const parsedDay = JSON.parse(day);

    // Validate the input values
    if (!description) {
        return res.status(400).json({ error: "Importance and description are required." });
    }
    console.log(importance, description);
    console.log(day);
    let oneDayTask = await getData(day);

    let newTaskInfo = {
        importance: importance,
        description: description
    }
    oneDayTask[0].taskinfo.push(newTaskInfo);
    await postNewTask(oneDayTask);




    // Process the form data, for example, you can save it to the database
    // Here you would add code to save the task to the database

    // Respond with a success message
    res.status(200).redirect("/");
});


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