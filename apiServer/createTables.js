import { pool } from './server.js';


// Function to create the user table with a unique constraint on (name, email)
export async function createUserTable() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Check if the user table already exists
        const result = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user') AS table_exists");
        if (!result.rows[0].table_exists) {
            // Create the user table with a unique constraint on (name, email)
            await client.query(`
                CREATE TABLE "user" (
                    id SERIAL PRIMARY KEY,
                    name varchar(50) NOT NULL,
                    email varchar(50) NOT NULL,
                    ava TEXT,
                    CONSTRAINT unique_name_email UNIQUE (name, email)
                )
            `);
            console.log("User table created successfully.");
        } else {
            console.log("User table already exists.");
        }
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error creating user table:", err);
    } finally {
        client.release();
    }
}


export async function createTasksTable() {
    try {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'tasks'
            );
        `;
        const { rows } = await pool.query(checkTableQuery);
        const tableExists = rows[0].exists;

        if (!tableExists) {
            await pool.query(`
                CREATE TABLE tasks (
                    id SERIAL PRIMARY KEY,
                    date DATE NOT NULL,
                    userID INTEGER REFERENCES "user"(id),
                    taskInfo JSONB[]
                );
            `);
            console.log("Tasks table created successfully.");
        } else {
            console.log("Tasks table already exists.");
        }
    } catch (error) {
        console.error("Error creating tasks table:", error);
    }
}

