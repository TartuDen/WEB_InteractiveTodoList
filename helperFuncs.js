
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
export function isToday() {
    const today = new Date();
    const formattedToday = formatDate(today);
    return formattedToday;
}
export function isTomorrow() {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const formattedTomorrow = formatDate(tomorrow);
    return formattedTomorrow;
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
