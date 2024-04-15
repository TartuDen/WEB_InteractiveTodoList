
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

export function updateTasks(tasks, today, user) {
    // Find the index of the task corresponding to today's date
    const index = tasks.findIndex(task => task.date.slice(0, 10) === today);

    // If a task for today is found
    if (index !== -1) {
        // Remove all tasks before today
        tasks = tasks.slice(index);
        // console.log(tasks);
        
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
    return tasks;
}

