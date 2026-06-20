const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function createDB() {

    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    `);

    console.log("Database Ready");

    return db;
}

module.exports = createDB;