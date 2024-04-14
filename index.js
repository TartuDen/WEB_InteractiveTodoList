import express from 'express';
import bodyParser from 'body-parser';
import { describe } from 'node:test';
import axios from 'axios';

const app = express();
const port = 8080;
const apiURL = "http://localhost:8081/api/v01"

let user = {
    id: 1,
    name: "Den",
    email: "den@ver.com",
    ava: ""
}

// let tasks = [
//     // Today's tasks
//     {
//         id: 1,
//         date: "13.04.2024",
//         userID: 1,
//         taskInfo: [{
//                 description: "Study",
//                 importance: "high",
//             },
//             {
//                 description: "Play with kids",
//                 importance: "medium",
//             },
//             {
//                 description: "Watch movie with Alina",
//                 importance: "high",
//             }
//         ]
//     },
//     // Tomorrow's tasks
//     {
//         id: 2,
//         date: "14.04.2024",
//         userID: 1,
//         taskInfo: [{
//                 description: "Go to the gym",
//                 importance: "medium",
//             },
//             {
//                 description: "Do grocery shopping",
//                 importance: "high",
//             },
//             {
//                 description: "Work on project proposal",
//                 importance: "high",
//             },
//             {
//                 description: "Call mom",
//                 importance: "low",
//             }
//         ]
//     },
//     // Day after tomorrow's tasks
//     {
//         id: 3,
//         date: "15.04.2024",
//         userID: 1,
//         taskInfo: [{
//                 description: "Attend meeting with team",
//                 importance: "high",
//             },
//             {
//                 description: "Visit dentist",
//                 importance: "high",
//             },
//             {
//                 description: "Read book",
//                 importance: "low",
//             },
//             {
//                 description: "Prepare dinner",
//                 importance: "medium",
//             }
//         ]
//     },
//     // Empty day
//     {
//         id: 4,
//         date: "16.04.2024",
//         userID: 1,
//         taskInfo: []
//     },
//     // Empty day
//     {
//         id: 5,
//         date: "17.04.2024",
//         userID: 1,
//         taskInfo: []
//     },
//     // Empty day
//     {
//         id: 6,
//         date: "18.04.2024",
//         userID: 1,
//         taskInfo: []
//     },
//     // Empty day
//     {
//         id: 7,
//         date: "19.04.2024",
//         userID: 1,
//         taskInfo: []
//     }
// ];


function isToday() {
    const today = new Date();
    const formattedToday = formatDate(today);
    return formattedToday;
}

function isTomorrow() {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const formattedTomorrow = formatDate(tomorrow);
    return formattedTomorrow;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
}

async function getData(){
    try{
        let apiResp = await axios.get(apiURL, [user]);
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

    res.status(200).render("index.ejs", { user, tasks, today, tomorrow })
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Proxy Server is running on port " + port)
})