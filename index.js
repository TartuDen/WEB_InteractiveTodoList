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